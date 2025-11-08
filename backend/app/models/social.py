"""
Social features models - Posts, Comments, Likes
"""
from sqlalchemy import Column, String, Text, Integer, ForeignKey, Boolean, UniqueConstraint
from sqlalchemy.orm import relationship

from app.models.base import BaseModel


class SocialPost(BaseModel):
    """
    Social post model for sharing dreams publicly
    """
    __tablename__ = "social_posts"

    # Ownership
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    dream_id = Column(Integer, ForeignKey("dreams.id", ondelete="CASCADE"), nullable=False, unique=True)

    # Content
    caption = Column(Text, nullable=True)  # Additional caption by user
    interpretation_included = Column(Boolean, default=False)  # Whether interpretation is shared

    # Engagement Counters (denormalized for performance)
    likes_count = Column(Integer, default=0)
    comments_count = Column(Integer, default=0)

    # Moderation
    is_flagged = Column(Boolean, default=False)
    is_hidden = Column(Boolean, default=False)

    # Relationships
    user = relationship("User", back_populates="posts")
    dream = relationship("Dream", back_populates="social_post")
    comments = relationship("Comment", back_populates="post", cascade="all, delete-orphan")
    likes = relationship("Like", back_populates="post", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<SocialPost {self.id} by User {self.user_id}>"


class Comment(BaseModel):
    """
    Comment model for social posts
    """
    __tablename__ = "comments"

    # Ownership
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    post_id = Column(Integer, ForeignKey("social_posts.id", ondelete="CASCADE"), nullable=False)

    # Content
    text = Column(Text, nullable=False)

    # Threading (for nested comments)
    parent_comment_id = Column(Integer, ForeignKey("comments.id", ondelete="CASCADE"), nullable=True)

    # Moderation
    is_flagged = Column(Boolean, default=False)
    is_hidden = Column(Boolean, default=False)

    # Relationships
    user = relationship("User", back_populates="comments")
    post = relationship("SocialPost", back_populates="comments")
    parent = relationship("Comment", remote_side="Comment.id", backref="replies")

    def __repr__(self):
        return f"<Comment {self.id} on Post {self.post_id}>"


class Like(BaseModel):
    """
    Like model for social posts
    """
    __tablename__ = "likes"
    __table_args__ = (
        UniqueConstraint('user_id', 'post_id', name='unique_user_post_like'),
    )

    # Ownership
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    post_id = Column(Integer, ForeignKey("social_posts.id", ondelete="CASCADE"), nullable=False)

    # Relationships
    user = relationship("User", back_populates="likes")
    post = relationship("SocialPost", back_populates="likes")

    def __repr__(self):
        return f"<Like by User {self.user_id} on Post {self.post_id}>"
