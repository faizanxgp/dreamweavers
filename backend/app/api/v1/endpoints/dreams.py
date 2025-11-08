"""
Dream Journal CRUD endpoints
"""
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_

from app.core.database import get_db
from app.core.dependencies import get_current_active_user
from app.models.user import User
from app.models.dream import Dream, DreamPrivacy
from app.schemas.dream import DreamCreate, DreamUpdate, DreamResponse, DreamListResponse
from app.core.config import settings


router = APIRouter()


@router.post("/", response_model=DreamResponse, status_code=status.HTTP_201_CREATED)
async def create_dream(
    dream_data: DreamCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Create a new dream journal entry
    """
    new_dream = Dream(
        user_id=current_user.id,
        title=dream_data.title,
        description=dream_data.description,
        dream_type=dream_data.dream_type,
        privacy=dream_data.privacy,
        emotions=dream_data.emotions,
        symbols=dream_data.symbols,
        colors=dream_data.colors,
        people=dream_data.people,
        dream_date=dream_data.dream_date,
        time_of_day=dream_data.time_of_day,
        istikhara_decision=dream_data.istikhara_decision,
        tags=dream_data.tags,
    )

    db.add(new_dream)
    await db.commit()
    await db.refresh(new_dream)

    return DreamResponse.from_orm(new_dream)


@router.get("/", response_model=DreamListResponse)
async def get_dreams(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get all dreams for the current user with pagination
    """
    # Calculate offset
    offset = (page - 1) * page_size

    # Get total count
    count_query = select(func.count(Dream.id)).where(Dream.user_id == current_user.id)
    total_result = await db.execute(count_query)
    total = total_result.scalar_one()

    # Get paginated dreams
    query = (
        select(Dream)
        .where(Dream.user_id == current_user.id)
        .order_by(Dream.created_at.desc())
        .offset(offset)
        .limit(page_size)
    )

    result = await db.execute(query)
    dreams = result.scalars().all()

    return DreamListResponse(
        dreams=[DreamResponse.from_orm(dream) for dream in dreams],
        total=total,
        page=page,
        page_size=page_size
    )


@router.get("/{dream_id}", response_model=DreamResponse)
async def get_dream(
    dream_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get a specific dream by ID
    """
    query = select(Dream).where(
        and_(
            Dream.id == dream_id,
            Dream.user_id == current_user.id
        )
    )

    result = await db.execute(query)
    dream = result.scalar_one_or_none()

    if not dream:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dream not found"
        )

    return DreamResponse.from_orm(dream)


@router.put("/{dream_id}", response_model=DreamResponse)
async def update_dream(
    dream_id: int,
    dream_data: DreamUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Update a dream entry
    """
    # Get the dream
    query = select(Dream).where(
        and_(
            Dream.id == dream_id,
            Dream.user_id == current_user.id
        )
    )

    result = await db.execute(query)
    dream = result.scalar_one_or_none()

    if not dream:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dream not found"
        )

    # Update fields that are provided
    update_data = dream_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(dream, field, value)

    await db.commit()
    await db.refresh(dream)

    return DreamResponse.from_orm(dream)


@router.delete("/{dream_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_dream(
    dream_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Delete a dream entry
    """
    # Get the dream
    query = select(Dream).where(
        and_(
            Dream.id == dream_id,
            Dream.user_id == current_user.id
        )
    )

    result = await db.execute(query)
    dream = result.scalar_one_or_none()

    if not dream:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dream not found"
        )

    await db.delete(dream)
    await db.commit()

    return None
