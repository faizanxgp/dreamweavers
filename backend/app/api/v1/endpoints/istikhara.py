"""
Istikhara dream interpretation endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_db
from app.api.dependencies import get_current_user_id
from app.schemas.dream import IstikharaDreamCreate, IstikharaDreamResponse
from app.schemas.interpretation import InterpretationResponse
from app.services.dream_service import dream_service
from app.models.dream import DreamType

router = APIRouter()


@router.post(
    "",
    response_model=IstikharaDreamResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit Istikhara Dream",
    description="Submit a dream seen after performing Istikhara prayer for interpretation"
)
async def create_istikhara_dream(
    dream_data: IstikharaDreamCreate,
    db: AsyncSession = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    """
    Create an Istikhara dream entry and get AI interpretation

    - **title**: A brief title for the dream
    - **description**: Detailed description of the dream
    - **istikhara_decision**: What decision you made Istikhara about
    - **emotions**: Optional list of emotions felt during the dream
    - **symbols**: Optional list of key symbols noticed
    - **colors**: Optional list of prominent colors
    - **people**: Optional list of people in the dream
    """
    # Create the dream and generate interpretation
    dream = await dream_service.create_istikhara_dream(
        db=db,
        dream_data=dream_data,
        user_id=user_id
    )

    await db.commit()
    await db.refresh(dream)

    # Get the interpretation
    interpretations = await dream_service.get_dream_interpretations(db, dream.id)

    # Prepare response
    response_data = {
        "id": dream.id,
        "user_id": dream.user_id,
        "title": dream.title,
        "description": dream.description,
        "dream_type": dream.dream_type.value if hasattr(dream.dream_type, 'value') else dream.dream_type,
        "istikhara_decision": dream.istikhara_decision,
        "emotions": dream.emotions,
        "symbols": dream.symbols,
        "colors": dream.colors,
        "people": dream.people,
        "dream_date": dream.dream_date,
        "time_of_day": dream.time_of_day,
        "privacy": dream.privacy.value if hasattr(dream.privacy, 'value') else dream.privacy,
        "is_shared": dream.is_shared,
        "created_at": dream.created_at,
        "updated_at": dream.updated_at,
        "interpretation": None
    }

    if interpretations:
        # Add the most recent interpretation
        latest = interpretations[0]
        response_data["interpretation"] = {
            "id": latest.id,
            "content": latest.interpretation_text,
            "spiritual_guidance": latest.spiritual_guidance,
            "confidence_score": latest.confidence_score,
            "created_at": latest.created_at
        }

    return response_data


@router.get(
    "/{dream_id}",
    response_model=IstikharaDreamResponse,
    summary="Get Istikhara Dream",
    description="Retrieve an Istikhara dream with its interpretation"
)
async def get_istikhara_dream(
    dream_id: int,
    db: AsyncSession = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    """
    Get a specific Istikhara dream by ID
    """
    dream = await dream_service.get_dream_by_id(db, dream_id, user_id)

    if not dream:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dream not found or you don't have permission to view it"
        )

    if dream.dream_type != DreamType.ISTIKHARA:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This dream is not an Istikhara dream"
        )

    # Get interpretations
    interpretations = await dream_service.get_dream_interpretations(db, dream.id)

    # Prepare response
    response_data = {
        "id": dream.id,
        "user_id": dream.user_id,
        "title": dream.title,
        "description": dream.description,
        "dream_type": dream.dream_type.value if hasattr(dream.dream_type, 'value') else dream.dream_type,
        "istikhara_decision": dream.istikhara_decision,
        "emotions": dream.emotions,
        "symbols": dream.symbols,
        "colors": dream.colors,
        "people": dream.people,
        "dream_date": dream.dream_date,
        "time_of_day": dream.time_of_day,
        "privacy": dream.privacy.value if hasattr(dream.privacy, 'value') else dream.privacy,
        "is_shared": dream.is_shared,
        "created_at": dream.created_at,
        "updated_at": dream.updated_at,
        "interpretation": None
    }

    if interpretations:
        latest = interpretations[0]
        response_data["interpretation"] = {
            "id": latest.id,
            "content": latest.interpretation_text,
            "spiritual_guidance": latest.spiritual_guidance,
            "confidence_score": latest.confidence_score,
            "created_at": latest.created_at
        }

    return response_data


@router.get(
    "/{dream_id}/interpretations",
    response_model=List[InterpretationResponse],
    summary="Get All Interpretations",
    description="Get all interpretations for an Istikhara dream"
)
async def get_dream_interpretations(
    dream_id: int,
    db: AsyncSession = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    """
    Get all interpretations for a specific Istikhara dream
    """
    dream = await dream_service.get_dream_by_id(db, dream_id, user_id)

    if not dream:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dream not found or you don't have permission to view it"
        )

    interpretations = await dream_service.get_dream_interpretations(db, dream_id)

    return interpretations
