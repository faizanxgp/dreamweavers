"""
Social features models - Posts, Comments, Likes, Followers, Shares, Notifications, Mentions
"""
from sqlalchemy import Column, String, Text, Integer, ForeignKey, Boolean, UniqueConstraint, CheckConstraint, Enum as SQLEnum
from sqlalchemy.orm import relationship
import enum

from app.models.base import BaseModel


class NotificationType(str, enum.Enum):
    """Notification types in the system"""
    FOLLOW = "follow"
    LIKE = "like"
    COMMENT = "comment"
    SHARE = "share"
    MENTION = "mention"
    INTERPRETATION_RECEIVED = "interpretation_received"
    IMAM_ASSIGNED = "imam_assigned"


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
    shares_count = Column(Integer, default=0)

    # Moderation
    is_flagged = Column(Boolean, default=False)
    is_hidden = Column(Boolean, default=False)

    # Relationships
    user = relationship("User", back_populates="posts")
    dream = relationship("Dream", back_populates="social_post")
    comments = relationship("Comment", back_populates="post", cascade="all, delete-orphan")
    likes = relationship("Like", back_populates="post", cascade="all, delete-orphan")
    shares = relationship("Share", back_populates="post", cascade="all, delete-orphan")
    mentions = relationship("Mention", foreign_keys="Mention.post_id", back_populates="post", cascade="all, delete-orphan")

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
    mentions = relationship("Mention", foreign_keys="Mention.comment_id", back_populates="comment", cascade="all, delete-orphan")
    notifications = relationship("Notification", foreign_keys="Notification.comment_id", back_populates="comment")

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


class Follower(BaseModel):
    """
    Follower model for user follow relationships
    """
    __tablename__ = "followers"
    __table_args__ = (
        UniqueConstraint('follower_id', 'following_id', name='unique_follower_following'),
        CheckConstraint('follower_id != following_id', name='prevent_self_follow'),
    )

    # Relationship
    follower_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    following_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    # Relationships
    follower = relationship("User", foreign_keys=[follower_id], back_populates="following")
    following = relationship("User", foreign_keys=[following_id], back_populates="followers")

    def __repr__(self):
        return f"<Follower {self.follower_id} follows {self.following_id}>"


class Share(BaseModel):
    """
    Share model for sharing/reposting dreams
    """
    __tablename__ = "shares"
    __table_args__ = (
        UniqueConstraint('user_id', 'post_id', name='unique_user_post_share'),
    )

    # Ownership
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    post_id = Column(Integer, ForeignKey("social_posts.id", ondelete="CASCADE"), nullable=False)

    # Content
    caption = Column(Text, nullable=True)  # Optional comment when sharing

    # Relationships
    user = relationship("User", back_populates="shares")
    post = relationship("SocialPost", back_populates="shares")

    def __repr__(self):
        return f"<Share by User {self.user_id} of Post {self.post_id}>"


class Notification(BaseModel):
    """
    Notification model for user notifications
    """
    __tablename__ = "notifications"

    # Ownership
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    # Notification details
    type = Column(SQLEnum(NotificationType), nullable=False)
    title = Column(String(200), nullable=False)
    message = Column(Text, nullable=True)

    # Related entities (nullable, depending on notification type)
    actor_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    post_id = Column(Integer, ForeignKey("social_posts.id", ondelete="CASCADE"), nullable=True)
    comment_id = Column(Integer, ForeignKey("comments.id", ondelete="CASCADE"), nullable=True)
    dream_id = Column(Integer, ForeignKey("dreams.id", ondelete="CASCADE"), nullable=True)
    interpretation_id = Column(Integer, ForeignKey("interpretations.id", ondelete="CASCADE"), nullable=True)

    # Status
    is_read = Column(Boolean, default=False)

    # Relationships
    user = relationship("User", foreign_keys=[user_id], back_populates="notifications")
    actor = relationship("User", foreign_keys=[actor_id])
    post = relationship("SocialPost", foreign_keys=[post_id])
    comment = relationship("Comment", foreign_keys=[comment_id], back_populates="notifications")

    def __repr__(self):
        return f"<Notification {self.type} for User {self.user_id}>"


class Mention(BaseModel):
    """
    Mention model for user mentions in comments and posts
    """
    __tablename__ = "mentions"
    __table_args__ = (
        CheckConstraint(
            '(comment_id IS NOT NULL AND post_id IS NULL) OR (comment_id IS NULL AND post_id IS NOT NULL)',
            name='mention_target'
        ),
    )

    # Ownership
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)  # User being mentioned
    comment_id = Column(Integer, ForeignKey("comments.id", ondelete="CASCADE"), nullable=True)
    post_id = Column(Integer, ForeignKey("social_posts.id", ondelete="CASCADE"), nullable=True)
    mentioned_by = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    # Relationships
    user = relationship("User", foreign_keys=[user_id], back_populates="mentions_received")
    mentioner = relationship("User", foreign_keys=[mentioned_by], back_populates="mentions_made")
    comment = relationship("Comment", foreign_keys=[comment_id], back_populates="mentions")
    post = relationship("SocialPost", foreign_keys=[post_id], back_populates="mentions")

    def __repr__(self):
        return f"<Mention of User {self.user_id} by User {self.mentioned_by}>"
