"""
Azkar Pydantic Schemas for Request/Response
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class AzkarBase(BaseModel):
    """Base Azkar schema"""
    arabic_text: str = Field(..., description="Arabic text of the supplication")
    transliteration: Optional[str] = Field(None, description="Transliteration of the Arabic text")
    translation: str = Field(..., description="English translation")
    category: str = Field(..., description="Category: night, sleep, morning, evening")
    reference: Optional[str] = Field(None, description="Quranic or Hadith reference")
    display_order: int = Field(default=0, description="Display order")


class AzkarCreate(AzkarBase):
    """Schema for creating Azkar"""
    pass


class AzkarUpdate(BaseModel):
    """Schema for updating Azkar"""
    arabic_text: Optional[str] = None
    transliteration: Optional[str] = None
    translation: Optional[str] = None
    category: Optional[str] = None
    reference: Optional[str] = None
    display_order: Optional[int] = None


class AzkarResponse(AzkarBase):
    """Schema for Azkar response"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class AzkarListResponse(BaseModel):
    """Schema for list of Azkar"""
    total: int
    azkar: list[AzkarResponse]
