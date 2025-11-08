"""
Pydantic schemas package
"""
from app.schemas.social import (
    # Posts
    SocialPostCreate,
    SocialPostUpdate,
    SocialPostResponse,
    SocialPostList,

    # Comments
    CommentCreate,
    CommentUpdate,
    CommentResponse,

    # Likes
    LikeResponse,

    # Followers
    FollowResponse,
    FollowerListResponse,

    # Shares
    ShareCreate,
    ShareResponse,

    # Notifications
    NotificationResponse,
    NotificationUpdate,

    # Mentions
    MentionCreate,
    MentionResponse,
)

__all__ = [
    # Posts
    "SocialPostCreate",
    "SocialPostUpdate",
    "SocialPostResponse",
    "SocialPostList",

    # Comments
    "CommentCreate",
    "CommentUpdate",
    "CommentResponse",

    # Likes
    "LikeResponse",

    # Followers
    "FollowResponse",
    "FollowerListResponse",

    # Shares
    "ShareCreate",
    "ShareResponse",

    # Notifications
    "NotificationResponse",
    "NotificationUpdate",

    # Mentions
    "MentionCreate",
    "MentionResponse",
]
