"""
Pydantic schemas for Dream journal entries
"""
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field

from app.models.dream import DreamType, DreamPrivacy


class DreamBase(BaseModel):
    """Base schema for Dream"""
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1)
    dream_type: DreamType = DreamType.REGULAR
    privacy: DreamPrivacy = DreamPrivacy.PRIVATE

    # Optional context fields
    emotions: Optional[List[str]] = None
    symbols: Optional[List[str]] = None
    colors: Optional[List[str]] = None
    people: Optional[List[str]] = None

    # Timing
    dream_date: Optional[str] = None
    time_of_day: Optional[str] = None

    # Istikhara specific
    istikhara_decision: Optional[str] = None

    # Metadata
    tags: Optional[List[str]] = None


class DreamCreate(DreamBase):
    """Schema for creating a new dream"""
    pass


class DreamUpdate(BaseModel):
    """Schema for updating a dream"""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=1)
    dream_type: Optional[DreamType] = None
    privacy: Optional[DreamPrivacy] = None
    emotions: Optional[List[str]] = None
    symbols: Optional[List[str]] = None
    colors: Optional[List[str]] = None
    people: Optional[List[str]] = None
    dream_date: Optional[str] = None
    time_of_day: Optional[str] = None
    istikhara_decision: Optional[str] = None
    tags: Optional[List[str]] = None


class DreamResponse(DreamBase):
    """Schema for dream response"""
    id: int
    user_id: int
    is_shared: bool
    audio_url: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class DreamListResponse(BaseModel):
    """Schema for paginated dream list response"""
    dreams: List[DreamResponse]
    total: int
    page: int
    page_size: int
