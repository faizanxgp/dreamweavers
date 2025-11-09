"""
Dream schemas for request/response validation
"""
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime


class DreamBase(BaseModel):
    """Base dream schema"""
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=10)
    dream_type: str = Field(default="regular")
    emotions: Optional[List[str]] = None
    symbols: Optional[List[str]] = None
    colors: Optional[List[str]] = None
    people: Optional[List[str]] = None
    dream_date: Optional[str] = None
    time_of_day: Optional[str] = None
    privacy: str = Field(default="private")
    tags: Optional[List[str]] = None


class DreamCreate(DreamBase):
    """Schema for creating a dream"""
    pass


class DreamUpdate(BaseModel):
    """Schema for updating a dream"""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=10)
    emotions: Optional[List[str]] = None
    symbols: Optional[List[str]] = None
    colors: Optional[List[str]] = None
    people: Optional[List[str]] = None
    privacy: Optional[str] = None
    tags: Optional[List[str]] = None


class DreamResponse(DreamBase):
    """Schema for dream response"""
    id: int
    user_id: int
    is_shared: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class IstikharaDreamCreate(BaseModel):
    """Schema for creating an Istikhara dream"""
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=10)
    istikhara_decision: str = Field(..., min_length=5, description="The decision you made Istikhara for")
    emotions: Optional[List[str]] = None
    symbols: Optional[List[str]] = None
    colors: Optional[List[str]] = None
    people: Optional[List[str]] = None
    dream_date: Optional[str] = None
    time_of_day: Optional[str] = None
    privacy: str = Field(default="private")
    tags: Optional[List[str]] = None


class IstikharaDreamResponse(BaseModel):
    """Schema for Istikhara dream response with interpretation"""
    id: int
    user_id: int
    title: str
    description: str
    dream_type: str
    istikhara_decision: str
    emotions: Optional[List[str]] = None
    symbols: Optional[List[str]] = None
    colors: Optional[List[str]] = None
    people: Optional[List[str]] = None
    dream_date: Optional[str] = None
    time_of_day: Optional[str] = None
    privacy: str
    is_shared: bool
    created_at: datetime
    updated_at: datetime
    interpretation: Optional[dict] = None

    model_config = ConfigDict(from_attributes=True)
