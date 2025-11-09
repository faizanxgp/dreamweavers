"""
Interpretation schemas for request/response validation
"""
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime


class InterpretationResponse(BaseModel):
    """Schema for interpretation response"""
    id: int
    dream_id: int
    interpretation_type: str
    interpretation_text: str
    spiritual_guidance: Optional[str] = None
    quranic_references: Optional[str] = None
    hadith_references: Optional[str] = None
    confidence_score: Optional[float] = None
    model_name: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
