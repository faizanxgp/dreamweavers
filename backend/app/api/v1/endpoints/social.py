"""
Social features API endpoints - Posts, Comments, Likes, Followers, Shares, Notifications
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc, func, or_
from typing import List, Optional

from app.models import (
    SocialPost, Comment, Like, Follower, Share, Notification, User, Dream
)
from app.schemas.social import (
    SocialPostCreate, SocialPostUpdate, SocialPostResponse, SocialPostList,
    CommentCreate, CommentUpdate, CommentResponse,
    LikeResponse, FollowResponse, FollowerListResponse,
    ShareCreate, ShareResponse,
    NotificationResponse, NotificationUpdate,
    UserSocialStats
)

router = APIRouter()


# ============= Dependency Stubs =============
# TODO: Implement proper authentication and database session management
# For now, using placeholder functions

async def get_db() -> Session:
    """Get database session - TO BE IMPLEMENTED"""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Database session not configured"
    )


async def get_current_user(db: Session = Depends(get_db)) -> User:
    """Get current authenticated user - TO BE IMPLEMENTED"""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Authentication not configured"
    )


# ============= Social Posts Endpoints =============

@router.post("/posts", response_model=SocialPostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(
    post_data: SocialPostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new social post from a dream"""
    # Check if dream exists and belongs to user
    dream = db.query(Dream).filter(
        Dream.id == post_data.dream_id,
        Dream.user_id == current_user.id
    ).first()

    if not dream:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dream not found or doesn't belong to you"
        )

    # Check if dream is already posted
    existing_post = db.query(SocialPost).filter(
        SocialPost.dream_id == post_data.dream_id
    ).first()

    if existing_post:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Dream is already posted"
        )

    # Create post
    new_post = SocialPost(
        user_id=current_user.id,
        dream_id=post_data.dream_id,
        caption=post_data.caption,
        interpretation_included=post_data.interpretation_included
    )

    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_post


@router.get("/posts", response_model=SocialPostList)
async def get_posts(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    user_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get paginated list of social posts (feed)"""
    query = db.query(SocialPost).filter(SocialPost.is_hidden == False)

    # Filter by user if specified
    if user_id:
        query = query.filter(SocialPost.user_id == user_id)
    else:
        # Get posts from followed users and own posts (home feed)
        following_ids = db.query(Follower.following_id).filter(
            Follower.follower_id == current_user.id
        ).subquery()

        query = query.filter(
            or_(
                SocialPost.user_id == current_user.id,
                SocialPost.user_id.in_(following_ids)
            )
        )

    # Get total count
    total = query.count()

    # Apply pagination
    posts = query.order_by(desc(SocialPost.created_at)).offset(
        (page - 1) * page_size
    ).limit(page_size).all()

    return SocialPostList(
        posts=posts,
        total=total,
        page=page,
        page_size=page_size,
        has_more=total > (page * page_size)
    )


@router.get("/posts/{post_id}", response_model=SocialPostResponse)
async def get_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific social post"""
    post = db.query(SocialPost).filter(SocialPost.id == post_id).first()

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )

    return post


@router.patch("/posts/{post_id}", response_model=SocialPostResponse)
async def update_post(
    post_id: int,
    post_data: SocialPostUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a social post"""
    post = db.query(SocialPost).filter(
        SocialPost.id == post_id,
        SocialPost.user_id == current_user.id
    ).first()

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found or doesn't belong to you"
        )

    # Update fields
    if post_data.caption is not None:
        post.caption = post_data.caption
    if post_data.interpretation_included is not None:
        post.interpretation_included = post_data.interpretation_included

    db.commit()
    db.refresh(post)

    return post


@router.delete("/posts/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a social post"""
    post = db.query(SocialPost).filter(
        SocialPost.id == post_id,
        SocialPost.user_id == current_user.id
    ).first()

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found or doesn't belong to you"
        )

    db.delete(post)
    db.commit()


# ============= Comments Endpoints =============

@router.post("/comments", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
async def create_comment(
    comment_data: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new comment on a post"""
    # Check if post exists
    post = db.query(SocialPost).filter(SocialPost.id == comment_data.post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )

    # Check parent comment if specified
    if comment_data.parent_comment_id:
        parent = db.query(Comment).filter(
            Comment.id == comment_data.parent_comment_id,
            Comment.post_id == comment_data.post_id
        ).first()
        if not parent:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Parent comment not found"
            )

    # Create comment
    new_comment = Comment(
        user_id=current_user.id,
        post_id=comment_data.post_id,
        text=comment_data.text,
        parent_comment_id=comment_data.parent_comment_id
    )

    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)

    return new_comment


@router.get("/posts/{post_id}/comments", response_model=List[CommentResponse])
async def get_post_comments(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all comments for a post"""
    # Check if post exists
    post = db.query(SocialPost).filter(SocialPost.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )

    # Get top-level comments (no parent)
    comments = db.query(Comment).filter(
        Comment.post_id == post_id,
        Comment.parent_comment_id == None,
        Comment.is_hidden == False
    ).order_by(Comment.created_at).all()

    return comments


@router.patch("/comments/{comment_id}", response_model=CommentResponse)
async def update_comment(
    comment_id: int,
    comment_data: CommentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a comment"""
    comment = db.query(Comment).filter(
        Comment.id == comment_id,
        Comment.user_id == current_user.id
    ).first()

    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found or doesn't belong to you"
        )

    comment.text = comment_data.text
    db.commit()
    db.refresh(comment)

    return comment


@router.delete("/comments/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a comment"""
    comment = db.query(Comment).filter(
        Comment.id == comment_id,
        Comment.user_id == current_user.id
    ).first()

    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found or doesn't belong to you"
        )

    db.delete(comment)
    db.commit()


# ============= Likes Endpoints =============

@router.post("/posts/{post_id}/like", response_model=LikeResponse, status_code=status.HTTP_201_CREATED)
async def like_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Like a post"""
    # Check if post exists
    post = db.query(SocialPost).filter(SocialPost.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )

    # Check if already liked
    existing_like = db.query(Like).filter(
        Like.user_id == current_user.id,
        Like.post_id == post_id
    ).first()

    if existing_like:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Post already liked"
        )

    # Create like
    new_like = Like(
        user_id=current_user.id,
        post_id=post_id
    )

    db.add(new_like)
    db.commit()
    db.refresh(new_like)

    return new_like


@router.delete("/posts/{post_id}/like", status_code=status.HTTP_204_NO_CONTENT)
async def unlike_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Unlike a post"""
    like = db.query(Like).filter(
        Like.user_id == current_user.id,
        Like.post_id == post_id
    ).first()

    if not like:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Like not found"
        )

    db.delete(like)
    db.commit()


@router.get("/posts/{post_id}/likes", response_model=List[LikeResponse])
async def get_post_likes(
    post_id: int,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get users who liked a post"""
    # Check if post exists
    post = db.query(SocialPost).filter(SocialPost.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )

    likes = db.query(Like).filter(
        Like.post_id == post_id
    ).order_by(desc(Like.created_at)).offset(
        (page - 1) * page_size
    ).limit(page_size).all()

    return likes


# ============= User Stats Endpoint =============

@router.get("/users/{user_id}/stats", response_model=UserSocialStats)
async def get_user_social_stats(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get social statistics for a user"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # Count posts
    posts_count = db.query(func.count(SocialPost.id)).filter(
        SocialPost.user_id == user_id
    ).scalar()

    # Count likes received
    likes_received = db.query(func.count(Like.id)).join(
        SocialPost
    ).filter(
        SocialPost.user_id == user_id
    ).scalar()

    # Count comments received
    comments_received = db.query(func.count(Comment.id)).join(
        SocialPost
    ).filter(
        SocialPost.user_id == user_id
    ).scalar()

    # Count shares received
    shares_received = db.query(func.count(Share.id)).join(
        SocialPost
    ).filter(
        SocialPost.user_id == user_id
    ).scalar()

    return UserSocialStats(
        followers_count=user.followers_count,
        following_count=user.following_count,
        posts_count=posts_count,
        likes_received=likes_received,
        comments_received=comments_received,
        shares_received=shares_received
    )
