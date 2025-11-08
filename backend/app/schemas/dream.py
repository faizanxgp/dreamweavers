"""
Pydantic schemas for dreams
"""
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field


class DreamCreate(BaseModel):
    """
    Schema for creating a new dream entry
    """
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
    istikhara_decision: Optional[str] = None
    tags: Optional[List[str]] = None

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Flying Dream",
                "description": "I dreamed I was flying over beautiful green fields",
                "dream_type": "regular",
                "emotions": ["peaceful", "joyful"],
                "symbols": ["flying", "green fields"],
                "time_of_day": "before_fajr"
            }
        }


class DreamResponse(BaseModel):
    """
    Schema for dream response
    """
    id: int
    user_id: int
    title: str
    description: str
    dream_type: str
    emotions: Optional[List[str]] = None
    symbols: Optional[List[str]] = None
    dream_date: Optional[str] = None
    time_of_day: Optional[str] = None
    privacy: str
    created_at: datetime

    class Config:
        from_attributes = True
