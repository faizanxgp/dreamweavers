"""
Azkar API Endpoints
Islamic supplications and Quranic verses for various times
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.db.session import get_db
from app.models.azkar import Azkar
from app.schemas.azkar import AzkarResponse, AzkarListResponse, AzkarCreate, AzkarUpdate

router = APIRouter()


@router.get("/", response_model=AzkarListResponse)
async def get_all_azkar(
    category: Optional[str] = Query(None, description="Filter by category: night, sleep, morning, evening"),
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=200, description="Maximum number of records to return"),
    db: AsyncSession = Depends(get_db)
):
    """
    Get all Azkar with optional filtering by category
    """
    # Build query
    query = select(Azkar).order_by(Azkar.display_order, Azkar.id)

    if category:
        query = query.where(Azkar.category == category)

    # Get total count
    count_query = select(func.count()).select_from(Azkar)
    if category:
        count_query = count_query.where(Azkar.category == category)

    total_result = await db.execute(count_query)
    total = total_result.scalar()

    # Apply pagination
    query = query.offset(skip).limit(limit)

    # Execute query
    result = await db.execute(query)
    azkar = result.scalars().all()

    return AzkarListResponse(
        total=total,
        azkar=[AzkarResponse.model_validate(a) for a in azkar]
    )


@router.get("/night", response_model=AzkarListResponse)
async def get_night_azkar(
    db: AsyncSession = Depends(get_db)
):
    """
    Get all night Azkar (supplications to recite before bed)
    """
    query = select(Azkar).where(Azkar.category == "night").order_by(Azkar.display_order)
    result = await db.execute(query)
    azkar = result.scalars().all()

    return AzkarListResponse(
        total=len(azkar),
        azkar=[AzkarResponse.model_validate(a) for a in azkar]
    )


@router.get("/sleep", response_model=AzkarListResponse)
async def get_sleep_duas(
    db: AsyncSession = Depends(get_db)
):
    """
    Get all sleep Duas (supplications for sleeping)
    """
    query = select(Azkar).where(Azkar.category == "sleep").order_by(Azkar.display_order)
    result = await db.execute(query)
    azkar = result.scalars().all()

    return AzkarListResponse(
        total=len(azkar),
        azkar=[AzkarResponse.model_validate(a) for a in azkar]
    )


@router.get("/morning", response_model=AzkarListResponse)
async def get_morning_azkar(
    db: AsyncSession = Depends(get_db)
):
    """
    Get all morning Azkar
    """
    query = select(Azkar).where(Azkar.category == "morning").order_by(Azkar.display_order)
    result = await db.execute(query)
    azkar = result.scalars().all()

    return AzkarListResponse(
        total=len(azkar),
        azkar=[AzkarResponse.model_validate(a) for a in azkar]
    )


@router.get("/evening", response_model=AzkarListResponse)
async def get_evening_azkar(
    db: AsyncSession = Depends(get_db)
):
    """
    Get all evening Azkar
    """
    query = select(Azkar).where(Azkar.category == "evening").order_by(Azkar.display_order)
    result = await db.execute(query)
    azkar = result.scalars().all()

    return AzkarListResponse(
        total=len(azkar),
        azkar=[AzkarResponse.model_validate(a) for a in azkar]
    )


@router.get("/{azkar_id}", response_model=AzkarResponse)
async def get_azkar_by_id(
    azkar_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Get a specific Azkar by ID
    """
    query = select(Azkar).where(Azkar.id == azkar_id)
    result = await db.execute(query)
    azkar = result.scalar_one_or_none()

    if not azkar:
        raise HTTPException(status_code=404, detail="Azkar not found")

    return AzkarResponse.model_validate(azkar)


@router.post("/", response_model=AzkarResponse, status_code=201)
async def create_azkar(
    azkar_data: AzkarCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Create a new Azkar (Admin only - authentication would be added here)
    """
    new_azkar = Azkar(**azkar_data.model_dump())
    db.add(new_azkar)
    await db.commit()
    await db.refresh(new_azkar)

    return AzkarResponse.model_validate(new_azkar)


@router.put("/{azkar_id}", response_model=AzkarResponse)
async def update_azkar(
    azkar_id: int,
    azkar_data: AzkarUpdate,
    db: AsyncSession = Depends(get_db)
):
    """
    Update an existing Azkar (Admin only - authentication would be added here)
    """
    query = select(Azkar).where(Azkar.id == azkar_id)
    result = await db.execute(query)
    azkar = result.scalar_one_or_none()

    if not azkar:
        raise HTTPException(status_code=404, detail="Azkar not found")

    # Update fields
    update_data = azkar_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(azkar, field, value)

    await db.commit()
    await db.refresh(azkar)

    return AzkarResponse.model_validate(azkar)


@router.delete("/{azkar_id}", status_code=204)
async def delete_azkar(
    azkar_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Delete an Azkar (Admin only - authentication would be added here)
    """
    query = select(Azkar).where(Azkar.id == azkar_id)
    result = await db.execute(query)
    azkar = result.scalar_one_or_none()

    if not azkar:
        raise HTTPException(status_code=404, detail="Azkar not found")

    await db.delete(azkar)
    await db.commit()

    return None
