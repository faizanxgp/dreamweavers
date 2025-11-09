"""
Sleep Tracking Pydantic Schemas
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, date, time


class SleepLogBase(BaseModel):
    """Base sleep log schema"""
    sleep_date: date = Field(..., description="Date of sleep")
    bedtime: Optional[time] = Field(None, description="Time went to bed")
    wake_time: Optional[time] = Field(None, description="Time woke up")
    hours_slept: Optional[float] = Field(None, ge=0, le=24, description="Total hours slept")
    quality_rating: Optional[int] = Field(None, ge=1, le=5, description="Sleep quality (1-5)")
    notes: Optional[str] = Field(None, description="Additional notes")
    recited_azkar: bool = Field(default=False, description="Whether Azkar was recited before sleep")


class SleepLogCreate(SleepLogBase):
    """Schema for creating sleep log"""
    pass


class SleepLogUpdate(BaseModel):
    """Schema for updating sleep log"""
    sleep_date: Optional[date] = None
    bedtime: Optional[time] = None
    wake_time: Optional[time] = None
    hours_slept: Optional[float] = None
    quality_rating: Optional[int] = None
    notes: Optional[str] = None
    recited_azkar: Optional[bool] = None


class SleepLogResponse(SleepLogBase):
    """Schema for sleep log response"""
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class SleepStatsResponse(BaseModel):
    """Schema for sleep statistics"""
    total_logs: int
    average_hours: Optional[float] = None
    average_quality: Optional[float] = None
    azkar_recitation_rate: Optional[float] = None
    best_quality_date: Optional[date] = None
    worst_quality_date: Optional[date] = None


class SleepGuidanceResponse(BaseModel):
    """Schema for sleep guidance recommendations"""
    recommendation: str
    suggested_bedtime: Optional[str] = None
    azkar_suggestions: list[str] = []
    tips: list[str] = []
