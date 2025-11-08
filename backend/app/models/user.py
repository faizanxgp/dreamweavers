"""
User model for authentication and profile management
"""
from sqlalchemy import Column, String, Boolean, Enum as SQLEnum
from sqlalchemy.orm import relationship
import enum

from app.models.base import BaseModel


class UserRole(str, enum.Enum):
    """User roles in the system"""
    USER = "user"
    IMAM = "imam"
    ADMIN = "admin"


class User(BaseModel):
    """
    User model for authentication and profile
    """
    __tablename__ = "users"

    # Authentication
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    role = Column(SQLEnum(UserRole), default=UserRole.USER)

    # Profile
    full_name = Column(String(200), nullable=True)
    bio = Column(String(500), nullable=True)
    avatar_url = Column(String(500), nullable=True)

    # Privacy Settings
    profile_visibility = Column(Boolean, default=True)
    allow_friend_requests = Column(Boolean, default=True)

    # Relationships
    dreams = relationship("Dream", back_populates="user", cascade="all, delete-orphan")
    interpretations = relationship("Interpretation", back_populates="user", cascade="all, delete-orphan")
    posts = relationship("SocialPost", back_populates="user", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    likes = relationship("Like", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User {self.username}>"
