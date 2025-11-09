"""
Azkar (Islamic Supplications) Database Model
"""
from sqlalchemy import Column, Integer, String, Text
from app.models.base import BaseModel


class Azkar(BaseModel):
    """
    Model for Islamic supplications and Quranic verses
    """
    __tablename__ = "azkar"

    # Content
    arabic_text = Column(Text, nullable=False)
    transliteration = Column(Text, nullable=True)
    translation = Column(Text, nullable=False)

    # Category (night, sleep, morning, evening)
    category = Column(String(100), nullable=False, index=True)

    # Reference (Quranic or Hadith reference)
    reference = Column(Text, nullable=True)

    # Display order
    display_order = Column(Integer, default=0, index=True)

    def __repr__(self):
        return f"<Azkar(id={self.id}, category={self.category}, order={self.display_order})>"
