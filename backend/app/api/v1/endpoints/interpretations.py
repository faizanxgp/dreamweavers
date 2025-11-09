"""
Dream Interpretation API endpoints
"""
from fastapi import APIRouter, HTTPException, Depends
from loguru import logger

from app.schemas.interpretation import (
    InterpretationRequest,
    InterpretationResponse,
    IstikharaInterpretationRequest,
)
from app.services.ollama_service import ollama_service

router = APIRouter()


@router.post("/interpret", response_model=InterpretationResponse)
async def interpret_dream(request: InterpretationRequest):
    """
    Interpret a dream using Ollama LLM

    This endpoint takes a dream description and optional context
    and returns an Islamic interpretation using the local Ollama LLM.

    Args:
        request: InterpretationRequest containing dream text and context

    Returns:
        InterpretationResponse with the interpretation and metadata
    """
    try:
        # Build context dictionary from request
        context = {}
        if request.emotions:
            context["emotions"] = ", ".join(request.emotions)
        if request.symbols:
            context["symbols"] = ", ".join(request.symbols)
        if request.time_of_day:
            context["time_of_day"] = request.time_of_day

        # Call Ollama service for interpretation
        result = await ollama_service.interpret_dream(
            dream_text=request.dream_text,
            context=context if context else None
        )

        # Add interpretation type to response
        if result.get("success"):
            result["interpretation_type"] = "regular"

        return InterpretationResponse(**result)

    except Exception as e:
        logger.error(f"Error in interpret_dream endpoint: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to interpret dream: {str(e)}"
        )


@router.post("/interpret/istikhara", response_model=InterpretationResponse)
async def interpret_istikhara_dream(request: IstikharaInterpretationRequest):
    """
    Interpret an Istikhara dream using Ollama LLM

    This endpoint provides specialized interpretation for dreams
    seen after performing Istikhara prayer.

    Args:
        request: IstikharaInterpretationRequest with dream and decision context

    Returns:
        InterpretationResponse with Istikhara-specific interpretation
    """
    try:
        # Call Ollama service for Istikhara interpretation
        result = await ollama_service.interpret_istikhara(
            dream_text=request.dream_text,
            decision_context=request.decision_context
        )

        # The result already has type="istikhara" from the service
        return InterpretationResponse(**result)

    except Exception as e:
        logger.error(f"Error in interpret_istikhara_dream endpoint: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to interpret Istikhara dream: {str(e)}"
        )


@router.get("/health")
async def check_ollama_health():
    """
    Check if Ollama service is running and accessible

    Returns:
        Dictionary with health status and details
    """
    try:
        is_healthy = await ollama_service.check_health()

        if is_healthy:
            return {
                "status": "healthy",
                "service": "ollama",
                "model": ollama_service.model,
                "host": ollama_service.base_url
            }
        else:
            return {
                "status": "unhealthy",
                "service": "ollama",
                "message": "Ollama service is not responding",
                "host": ollama_service.base_url
            }

    except Exception as e:
        logger.error(f"Error checking Ollama health: {e}")
        return {
            "status": "error",
            "service": "ollama",
            "error": str(e)
        }
