"""
Dream service for CRUD operations
"""
from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from loguru import logger

from app.models.dream import Dream, DreamType
from app.models.interpretation import Interpretation, InterpretationType
from app.schemas.dream import DreamCreate, IstikharaDreamCreate
from app.services.ollama_service import ollama_service


class DreamService:
    """Service for dream-related operations"""

    @staticmethod
    async def create_dream(
        db: AsyncSession,
        dream_data: DreamCreate,
        user_id: int
    ) -> Dream:
        """
        Create a new dream entry
        """
        dream = Dream(
            user_id=user_id,
            title=dream_data.title,
            description=dream_data.description,
            dream_type=dream_data.dream_type,
            emotions=dream_data.emotions,
            symbols=dream_data.symbols,
            colors=dream_data.colors,
            people=dream_data.people,
            dream_date=dream_data.dream_date,
            time_of_day=dream_data.time_of_day,
            privacy=dream_data.privacy,
            tags=dream_data.tags,
        )

        db.add(dream)
        await db.flush()
        await db.refresh(dream)

        return dream

    @staticmethod
    async def create_istikhara_dream(
        db: AsyncSession,
        dream_data: IstikharaDreamCreate,
        user_id: int
    ) -> Dream:
        """
        Create an Istikhara dream and generate interpretation
        """
        # Create the dream
        dream = Dream(
            user_id=user_id,
            title=dream_data.title,
            description=dream_data.description,
            dream_type=DreamType.ISTIKHARA,
            istikhara_decision=dream_data.istikhara_decision,
            emotions=dream_data.emotions,
            symbols=dream_data.symbols,
            colors=dream_data.colors,
            people=dream_data.people,
            dream_date=dream_data.dream_date,
            time_of_day=dream_data.time_of_day,
            privacy=dream_data.privacy,
            tags=dream_data.tags,
        )

        db.add(dream)
        await db.flush()
        await db.refresh(dream)

        # Generate interpretation using Ollama
        try:
            interpretation_result = await ollama_service.interpret_istikhara(
                dream_text=dream_data.description,
                decision_context=dream_data.istikhara_decision
            )

            if interpretation_result.get("success"):
                # Create interpretation record
                interpretation = Interpretation(
                    dream_id=dream.id,
                    user_id=user_id,
                    interpretation_type=InterpretationType.AI,
                    interpretation_text=interpretation_result.get("interpretation", ""),
                    spiritual_guidance="Please consult with knowledgeable scholars for important decisions.",
                    confidence_score=0.7,  # Moderate confidence for AI interpretations
                    model_name=interpretation_result.get("model", "unknown")
                )

                db.add(interpretation)
                await db.flush()

                logger.info(f"Created Istikhara interpretation for dream {dream.id}")
            else:
                logger.warning(f"Failed to generate interpretation: {interpretation_result.get('error')}")

        except Exception as e:
            logger.error(f"Error generating Istikhara interpretation: {e}")
            # Continue even if interpretation fails - dream is still saved

        await db.refresh(dream)
        return dream

    @staticmethod
    async def get_dream_by_id(
        db: AsyncSession,
        dream_id: int,
        user_id: Optional[int] = None
    ) -> Optional[Dream]:
        """
        Get a dream by ID
        If user_id is provided, check ownership or privacy
        """
        query = select(Dream).where(Dream.id == dream_id)

        if user_id is not None:
            # Allow if owner or public
            query = query.where(
                (Dream.user_id == user_id) | (Dream.privacy == "public")
            )

        result = await db.execute(query)
        return result.scalar_one_or_none()

    @staticmethod
    async def get_dream_interpretations(
        db: AsyncSession,
        dream_id: int
    ) -> List[Interpretation]:
        """
        Get all interpretations for a dream
        """
        query = select(Interpretation).where(
            Interpretation.dream_id == dream_id
        ).order_by(Interpretation.created_at.desc())

        result = await db.execute(query)
        return list(result.scalars().all())

    @staticmethod
    async def get_user_dreams(
        db: AsyncSession,
        user_id: int,
        dream_type: Optional[str] = None,
        limit: int = 20,
        offset: int = 0
    ) -> List[Dream]:
        """
        Get user's dreams with optional filtering
        """
        query = select(Dream).where(Dream.user_id == user_id)

        if dream_type:
            query = query.where(Dream.dream_type == dream_type)

        query = query.order_by(Dream.created_at.desc()).limit(limit).offset(offset)

        result = await db.execute(query)
        return list(result.scalars().all())


# Singleton instance
dream_service = DreamService()
