"""
Interpretation model for dream interpretations (AI and human)
"""
from sqlalchemy import Column, String, Text, Integer, ForeignKey, Float, Enum as SQLEnum
from sqlalchemy.orm import relationship
import enum

from app.models.base import BaseModel


class InterpretationType(str, enum.Enum):
    """Type of interpretation source"""
    AI = "ai"
    IMAM = "imam"
    COMMUNITY = "community"


class InterpretationStatus(str, enum.Enum):
    """Status of interpretation request"""
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    DECLINED = "declined"


class Interpretation(BaseModel):
    """
    Dream interpretation model
    """
    __tablename__ = "interpretations"

    # Ownership
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    dream_id = Column(Integer, ForeignKey("dreams.id", ondelete="CASCADE"), nullable=False)

    # Interpretation Details
    interpretation_type = Column(SQLEnum(InterpretationType), nullable=False)
    interpretation_text = Column(Text, nullable=False)

    # AI specific
    model_name = Column(String(100), nullable=True)  # Which LLM model was used
    confidence_score = Column(Float, nullable=True)  # AI confidence score

    # Imam specific
    imam_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # If from an Imam
    status = Column(SQLEnum(InterpretationStatus), default=InterpretationStatus.COMPLETED)

    # Metadata
    key_symbols = Column(Text, nullable=True)  # Main symbols identified
    spiritual_guidance = Column(Text, nullable=True)  # Spiritual advice
    quranic_references = Column(Text, nullable=True)  # Relevant Quran verses
    hadith_references = Column(Text, nullable=True)  # Relevant Hadith

    # User Feedback
    rating = Column(Integer, nullable=True)  # User rating 1-5
    feedback = Column(Text, nullable=True)  # User feedback on interpretation

    # Relationships
    user = relationship("User", back_populates="interpretations", foreign_keys=[user_id])
    dream = relationship("Dream", back_populates="interpretations")
    imam = relationship("User", foreign_keys=[imam_id])

    def __repr__(self):
        return f"<Interpretation {self.interpretation_type} for Dream {self.dream_id}>"
