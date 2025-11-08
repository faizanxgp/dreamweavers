"""
Pydantic schemas for social features
"""
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime
from app.models.social import NotificationType


# ============= Social Post Schemas =============

class SocialPostCreate(BaseModel):
    """Schema for creating a social post"""
    dream_id: int
    caption: Optional[str] = None
    interpretation_included: bool = False


class SocialPostUpdate(BaseModel):
    """Schema for updating a social post"""
    caption: Optional[str] = None
    interpretation_included: Optional[bool] = None


class SocialPostResponse(BaseModel):
    """Schema for social post response"""
    id: int
    user_id: int
    dream_id: int
    caption: Optional[str]
    interpretation_included: bool
    likes_count: int
    comments_count: int
    shares_count: int
    is_flagged: bool
    is_hidden: bool
    created_at: datetime
    updated_at: datetime

    # User info
    username: Optional[str] = None
    user_avatar: Optional[str] = None

    # Dream info
    dream_title: Optional[str] = None
    dream_description: Optional[str] = None

    # User interaction status
    is_liked: Optional[bool] = None
    is_shared: Optional[bool] = None

    model_config = ConfigDict(from_attributes=True)


class SocialPostList(BaseModel):
    """Schema for paginated list of social posts"""
    posts: List[SocialPostResponse]
    total: int
    page: int
    page_size: int
    has_more: bool


# ============= Comment Schemas =============

class CommentCreate(BaseModel):
    """Schema for creating a comment"""
    post_id: int
    text: str = Field(..., min_length=1, max_length=1000)
    parent_comment_id: Optional[int] = None


class CommentUpdate(BaseModel):
    """Schema for updating a comment"""
    text: str = Field(..., min_length=1, max_length=1000)


class CommentResponse(BaseModel):
    """Schema for comment response"""
    id: int
    user_id: int
    post_id: int
    text: str
    parent_comment_id: Optional[int]
    is_flagged: bool
    is_hidden: bool
    created_at: datetime
    updated_at: datetime

    # User info
    username: Optional[str] = None
    user_avatar: Optional[str] = None

    # Nested replies
    replies: Optional[List["CommentResponse"]] = None

    model_config = ConfigDict(from_attributes=True)


# ============= Like Schemas =============

class LikeResponse(BaseModel):
    """Schema for like response"""
    id: int
    user_id: int
    post_id: int
    created_at: datetime

    # User info
    username: Optional[str] = None
    user_avatar: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


# ============= Follower Schemas =============

class FollowResponse(BaseModel):
    """Schema for follow response"""
    id: int
    follower_id: int
    following_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class FollowerListResponse(BaseModel):
    """Schema for user info in follower/following lists"""
    id: int
    username: str
    full_name: Optional[str]
    avatar_url: Optional[str]
    bio: Optional[str]
    followers_count: int
    following_count: int
    is_following: Optional[bool] = None  # Whether current user follows this user
    followed_at: Optional[datetime] = None  # When the follow relationship was created

    model_config = ConfigDict(from_attributes=True)


# ============= Share Schemas =============

class ShareCreate(BaseModel):
    """Schema for creating a share"""
    post_id: int
    caption: Optional[str] = None


class ShareResponse(BaseModel):
    """Schema for share response"""
    id: int
    user_id: int
    post_id: int
    caption: Optional[str]
    created_at: datetime

    # User info
    username: Optional[str] = None
    user_avatar: Optional[str] = None

    # Original post info
    original_post: Optional[SocialPostResponse] = None

    model_config = ConfigDict(from_attributes=True)


# ============= Notification Schemas =============

class NotificationResponse(BaseModel):
    """Schema for notification response"""
    id: int
    user_id: int
    type: NotificationType
    title: str
    message: Optional[str]
    actor_id: Optional[int]
    post_id: Optional[int]
    comment_id: Optional[int]
    dream_id: Optional[int]
    interpretation_id: Optional[int]
    is_read: bool
    created_at: datetime

    # Actor info
    actor_username: Optional[str] = None
    actor_avatar: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class NotificationUpdate(BaseModel):
    """Schema for updating notification"""
    is_read: bool


# ============= Mention Schemas =============

class MentionCreate(BaseModel):
    """Schema for creating a mention"""
    user_id: int
    comment_id: Optional[int] = None
    post_id: Optional[int] = None


class MentionResponse(BaseModel):
    """Schema for mention response"""
    id: int
    user_id: int
    comment_id: Optional[int]
    post_id: Optional[int]
    mentioned_by: int
    created_at: datetime

    # User info
    username: Optional[str] = None
    mentioner_username: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


# ============= Stats Schemas =============

class UserSocialStats(BaseModel):
    """Schema for user social statistics"""
    followers_count: int
    following_count: int
    posts_count: int
    likes_received: int
    comments_received: int
    shares_received: int


class PostEngagementStats(BaseModel):
    """Schema for post engagement statistics"""
    likes_count: int
    comments_count: int
    shares_count: int
    unique_viewers: Optional[int] = None
    engagement_rate: Optional[float] = None
