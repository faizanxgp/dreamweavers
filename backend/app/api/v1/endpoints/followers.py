"""
Followers/Following API endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc, or_
from typing import List

from app.models import Follower, User
from app.schemas.social import FollowResponse, FollowerListResponse

router = APIRouter()


# ============= Dependency Stubs =============
# TODO: Implement proper authentication and database session management

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


# ============= Follow/Unfollow Endpoints =============

@router.post("/users/{user_id}/follow", response_model=FollowResponse, status_code=status.HTTP_201_CREATED)
async def follow_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Follow a user"""
    # Check if trying to follow self
    if user_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot follow yourself"
        )

    # Check if user exists
    user_to_follow = db.query(User).filter(User.id == user_id).first()
    if not user_to_follow:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # Check if already following
    existing_follow = db.query(Follower).filter(
        Follower.follower_id == current_user.id,
        Follower.following_id == user_id
    ).first()

    if existing_follow:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already following this user"
        )

    # Create follow relationship
    new_follow = Follower(
        follower_id=current_user.id,
        following_id=user_id
    )

    db.add(new_follow)
    db.commit()
    db.refresh(new_follow)

    return new_follow


@router.delete("/users/{user_id}/follow", status_code=status.HTTP_204_NO_CONTENT)
async def unfollow_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Unfollow a user"""
    follow = db.query(Follower).filter(
        Follower.follower_id == current_user.id,
        Follower.following_id == user_id
    ).first()

    if not follow:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Not following this user"
        )

    db.delete(follow)
    db.commit()


# ============= Get Followers/Following Lists =============

@router.get("/users/{user_id}/followers", response_model=List[FollowerListResponse])
async def get_followers(
    user_id: int,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get list of users following the specified user"""
    # Check if user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # Get followers
    followers = db.query(User, Follower.created_at).join(
        Follower, Follower.follower_id == User.id
    ).filter(
        Follower.following_id == user_id
    ).order_by(desc(Follower.created_at)).offset(
        (page - 1) * page_size
    ).limit(page_size).all()

    # Convert to response format
    result = []
    for follower_user, followed_at in followers:
        # Check if current user follows this follower
        is_following = db.query(Follower).filter(
            Follower.follower_id == current_user.id,
            Follower.following_id == follower_user.id
        ).first() is not None

        result.append(FollowerListResponse(
            id=follower_user.id,
            username=follower_user.username,
            full_name=follower_user.full_name,
            avatar_url=follower_user.avatar_url,
            bio=follower_user.bio,
            followers_count=follower_user.followers_count,
            following_count=follower_user.following_count,
            is_following=is_following,
            followed_at=followed_at
        ))

    return result


@router.get("/users/{user_id}/following", response_model=List[FollowerListResponse])
async def get_following(
    user_id: int,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get list of users that the specified user is following"""
    # Check if user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # Get following
    following = db.query(User, Follower.created_at).join(
        Follower, Follower.following_id == User.id
    ).filter(
        Follower.follower_id == user_id
    ).order_by(desc(Follower.created_at)).offset(
        (page - 1) * page_size
    ).limit(page_size).all()

    # Convert to response format
    result = []
    for following_user, followed_at in following:
        # Check if current user follows this user
        is_following = db.query(Follower).filter(
            Follower.follower_id == current_user.id,
            Follower.following_id == following_user.id
        ).first() is not None

        result.append(FollowerListResponse(
            id=following_user.id,
            username=following_user.username,
            full_name=following_user.full_name,
            avatar_url=following_user.avatar_url,
            bio=following_user.bio,
            followers_count=following_user.followers_count,
            following_count=following_user.following_count,
            is_following=is_following,
            followed_at=followed_at
        ))

    return result


@router.get("/users/{user_id}/is-following/{target_user_id}", response_model=dict)
async def check_if_following(
    user_id: int,
    target_user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Check if user_id is following target_user_id"""
    is_following = db.query(Follower).filter(
        Follower.follower_id == user_id,
        Follower.following_id == target_user_id
    ).first() is not None

    return {"is_following": is_following}


@router.get("/users/search", response_model=List[FollowerListResponse])
async def search_users(
    q: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Search for users by username or full name"""
    # Search users
    users = db.query(User).filter(
        or_(
            User.username.ilike(f"%{q}%"),
            User.full_name.ilike(f"%{q}%")
        ),
        User.is_active == True
    ).offset(
        (page - 1) * page_size
    ).limit(page_size).all()

    # Convert to response format
    result = []
    for user in users:
        # Check if current user follows this user
        is_following = db.query(Follower).filter(
            Follower.follower_id == current_user.id,
            Follower.following_id == user.id
        ).first() is not None

        result.append(FollowerListResponse(
            id=user.id,
            username=user.username,
            full_name=user.full_name,
            avatar_url=user.avatar_url,
            bio=user.bio,
            followers_count=user.followers_count,
            following_count=user.following_count,
            is_following=is_following,
            followed_at=None
        ))

    return result
