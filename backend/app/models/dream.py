"""
Dream model for dream journal entries
"""
from sqlalchemy import Column, String, Text, Integer, ForeignKey, Boolean, JSON, Enum as SQLEnum
from sqlalchemy.orm import relationship
import enum

from app.models.base import BaseModel


class DreamType(str, enum.Enum):
    """Types of dreams in Islamic tradition"""
    REGULAR = "regular"
    ISTIKHARA = "istikhara"
    PROPHETIC = "prophetic"  # Good dreams
    CONFUSED = "confused"  # Mixed dreams


class DreamPrivacy(str, enum.Enum):
    """Privacy settings for dreams"""
    PRIVATE = "private"
    FRIENDS = "friends"
    PUBLIC = "public"


class Dream(BaseModel):
    """
    Dream journal entry model
    """
    __tablename__ = "dreams"

    # Ownership
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    # Dream Content
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    dream_type = Column(SQLEnum(DreamType), default=DreamType.REGULAR)

    # Dream Context
    emotions = Column(JSON, nullable=True)  # List of emotions felt
    symbols = Column(JSON, nullable=True)  # Key symbols in the dream
    colors = Column(JSON, nullable=True)  # Prominent colors
    people = Column(JSON, nullable=True)  # People in the dream

    # Timing
    dream_date = Column(String(50), nullable=True)  # When the dream occurred
    time_of_day = Column(String(20), nullable=True)  # Morning, night, etc.

    # Privacy & Sharing
    privacy = Column(SQLEnum(DreamPrivacy), default=DreamPrivacy.PRIVATE)
    is_shared = Column(Boolean, default=False)

    # Istikhara specific
    istikhara_decision = Column(Text, nullable=True)  # What decision was being made

    # Metadata
    tags = Column(JSON, nullable=True)  # User-defined tags
    audio_url = Column(String(500), nullable=True)  # Voice recording of dream

    # Relationships
    user = relationship("User", back_populates="dreams")
    interpretations = relationship("Interpretation", back_populates="dream", cascade="all, delete-orphan")
    social_post = relationship("SocialPost", back_populates="dream", uselist=False)

    def __repr__(self):
        return f"<Dream {self.title} by User {self.user_id}>"
