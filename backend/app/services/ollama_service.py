"""
Ollama Service - Handles communication with local Ollama LLM for dream interpretation
"""
import httpx
from typing import Dict, Optional
from loguru import logger

from app.core.config import settings


class OllamaService:
    """
    Service class for interacting with Ollama API
    """

    def __init__(self):
        self.base_url = settings.OLLAMA_HOST
        self.model = settings.OLLAMA_MODEL
        self.timeout = settings.OLLAMA_TIMEOUT

    async def check_health(self) -> bool:
        """
        Check if Ollama service is running and accessible
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/api/tags",
                    timeout=5.0
                )
                return response.status_code == 200
        except Exception as e:
            logger.error(f"Ollama health check failed: {e}")
            return False

    async def interpret_dream(
        self,
        dream_text: str,
        context: Optional[Dict] = None
    ) -> Dict:
        """
        Send dream to Ollama for interpretation

        Args:
            dream_text: The dream description
            context: Additional context (emotions, symbols, etc.)

        Returns:
            Dictionary containing interpretation and metadata
        """
        try:
            # Construct the prompt with Islamic context
            prompt = self._build_interpretation_prompt(dream_text, context)

            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.post(
                    f"{self.base_url}/api/generate",
                    json={
                        "model": self.model,
                        "prompt": prompt,
                        "stream": False,
                        "options": {
                            "temperature": 0.7,
                            "top_p": 0.9,
                        }
                    }
                )

                if response.status_code == 200:
                    result = response.json()
                    interpretation = result.get("response", "")

                    return {
                        "success": True,
                        "interpretation": interpretation,
                        "model": self.model,
                        "confidence": self._calculate_confidence(interpretation)
                    }
                else:
                    logger.error(f"Ollama API error: {response.status_code}")
                    return {
                        "success": False,
                        "error": "Failed to generate interpretation"
                    }

        except Exception as e:
            logger.error(f"Dream interpretation error: {e}")
            return {
                "success": False,
                "error": str(e)
            }

    async def interpret_istikhara(
        self,
        dream_text: str,
        decision_context: str
    ) -> Dict:
        """
        Specialized interpretation for Istikhara dreams

        Args:
            dream_text: The dream description
            decision_context: What decision was the Istikhara about

        Returns:
            Dictionary containing Istikhara interpretation
        """
        try:
            prompt = self._build_istikhara_prompt(dream_text, decision_context)

            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.post(
                    f"{self.base_url}/api/generate",
                    json={
                        "model": self.model,
                        "prompt": prompt,
                        "stream": False,
                        "options": {
                            "temperature": 0.6,  # Lower temperature for more focused responses
                            "top_p": 0.85,
                        }
                    }
                )

                if response.status_code == 200:
                    result = response.json()
                    interpretation = result.get("response", "")

                    return {
                        "success": True,
                        "interpretation": interpretation,
                        "model": self.model,
                        "type": "istikhara"
                    }
                else:
                    return {
                        "success": False,
                        "error": "Failed to generate Istikhara interpretation"
                    }

        except Exception as e:
            logger.error(f"Istikhara interpretation error: {e}")
            return {
                "success": False,
                "error": str(e)
            }

    def _build_interpretation_prompt(
        self,
        dream_text: str,
        context: Optional[Dict] = None
    ) -> str:
        """
        Build a comprehensive prompt for dream interpretation
        """
        base_prompt = f"""You are an Islamic dream interpretation expert trained in classical Islamic dream interpretation traditions, including the works of Ibn Sirin, Al-Nabulsi, and other renowned scholars.

Please provide a thoughtful interpretation of the following dream from an Islamic perspective:

Dream: {dream_text}
"""

        if context:
            if context.get("emotions"):
                base_prompt += f"\nEmotions felt: {context['emotions']}"
            if context.get("symbols"):
                base_prompt += f"\nKey symbols: {context['symbols']}"
            if context.get("time_of_day"):
                base_prompt += f"\nTime when dreamed: {context['time_of_day']}"

        base_prompt += """

Please provide:
1. A general interpretation of the dream
2. Key symbols and their meanings in Islamic tradition
3. Spiritual guidance based on the dream
4. Any relevant Quranic verses or Hadith (if applicable)

Keep the interpretation balanced, hopeful, and grounded in Islamic teachings."""

        return base_prompt

    def _build_istikhara_prompt(
        self,
        dream_text: str,
        decision_context: str
    ) -> str:
        """
        Build specialized prompt for Istikhara dream interpretation
        """
        return f"""You are an Islamic dream interpretation expert specializing in Istikhara (seeking guidance) dreams.

The person performed Istikhara prayer regarding: {decision_context}

They saw the following dream after the Istikhara:
{dream_text}

Please provide a thoughtful interpretation specifically for this Istikhara dream:
1. What the dream might indicate about the decision
2. Positive and negative signs in the dream
3. Islamic guidance on how to proceed
4. Important reminder that the interpretation should be considered alongside other factors and consultation with knowledgeable people

Remember: Not all dreams after Istikhara are direct divine guidance. Some dreams are from oneself or other sources. Provide balanced, wise counsel."""

    def _calculate_confidence(self, interpretation: str) -> float:
        """
        Calculate a rough confidence score for the interpretation
        This is a placeholder - can be enhanced with ML models
        """
        # Basic heuristic based on response length and content
        if len(interpretation) < 50:
            return 0.3
        elif len(interpretation) < 150:
            return 0.6
        else:
            return 0.8


# Singleton instance
ollama_service = OllamaService()
