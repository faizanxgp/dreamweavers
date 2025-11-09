"""
Pydantic schemas for dream interpretation
"""
from typing import Optional, Dict, List
from pydantic import BaseModel, Field


class InterpretationRequest(BaseModel):
    """
    Request schema for dream interpretation
    """
    dream_text: str = Field(..., min_length=10, description="The dream description to interpret")
    emotions: Optional[List[str]] = Field(None, description="Emotions felt during the dream")
    symbols: Optional[List[str]] = Field(None, description="Key symbols in the dream")
    time_of_day: Optional[str] = Field(None, description="When the dream occurred (morning, night, etc.)")

    class Config:
        json_schema_extra = {
            "example": {
                "dream_text": "I saw myself flying over green fields with a bright light guiding me",
                "emotions": ["peaceful", "hopeful"],
                "symbols": ["flying", "green fields", "light"],
                "time_of_day": "before_fajr"
            }
        }


class IstikharaInterpretationRequest(BaseModel):
    """
    Request schema for Istikhara dream interpretation
    """
    dream_text: str = Field(..., min_length=10, description="The dream description after Istikhara")
    decision_context: str = Field(..., min_length=5, description="What decision the Istikhara was about")

    class Config:
        json_schema_extra = {
            "example": {
                "dream_text": "I saw clear water flowing in a garden with beautiful flowers",
                "decision_context": "Whether to accept a new job offer"
            }
        }


class InterpretationResponse(BaseModel):
    """
    Response schema for dream interpretation
    """
    success: bool = Field(..., description="Whether the interpretation was successful")
    interpretation: Optional[str] = Field(None, description="The interpretation text")
    model: Optional[str] = Field(None, description="The LLM model used")
    confidence: Optional[float] = Field(None, description="Confidence score (0-1)")
    interpretation_type: Optional[str] = Field(None, description="Type of interpretation (regular or istikhara)")
    error: Optional[str] = Field(None, description="Error message if interpretation failed")

    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "interpretation": "This dream shows positive signs...",
                "model": "llama2",
                "confidence": 0.8,
                "interpretation_type": "regular"
            }
        }
