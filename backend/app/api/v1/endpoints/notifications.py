"""
Notifications and Shares API endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from typing import List

from app.models import Notification, Share, SocialPost, User
from app.schemas.social import (
    NotificationResponse, NotificationUpdate,
    ShareCreate, ShareResponse
)

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


# ============= Notifications Endpoints =============

@router.get("/notifications", response_model=List[NotificationResponse])
async def get_notifications(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    unread_only: bool = False,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get user's notifications"""
    query = db.query(Notification).filter(
        Notification.user_id == current_user.id
    )

    if unread_only:
        query = query.filter(Notification.is_read == False)

    notifications = query.order_by(desc(Notification.created_at)).offset(
        (page - 1) * page_size
    ).limit(page_size).all()

    return notifications


@router.get("/notifications/unread-count", response_model=dict)
async def get_unread_count(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get count of unread notifications"""
    count = db.query(func.count(Notification.id)).filter(
        Notification.user_id == current_user.id,
        Notification.is_read == False
    ).scalar()

    return {"unread_count": count}


@router.patch("/notifications/{notification_id}", response_model=NotificationResponse)
async def update_notification(
    notification_id: int,
    notification_data: NotificationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Mark notification as read/unread"""
    notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == current_user.id
    ).first()

    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found"
        )

    notification.is_read = notification_data.is_read
    db.commit()
    db.refresh(notification)

    return notification


@router.post("/notifications/mark-all-read", response_model=dict)
async def mark_all_notifications_read(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Mark all notifications as read"""
    updated_count = db.query(Notification).filter(
        Notification.user_id == current_user.id,
        Notification.is_read == False
    ).update({"is_read": True})

    db.commit()

    return {"updated_count": updated_count}


@router.delete("/notifications/{notification_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a notification"""
    notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == current_user.id
    ).first()

    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found"
        )

    db.delete(notification)
    db.commit()


@router.delete("/notifications", status_code=status.HTTP_204_NO_CONTENT)
async def delete_all_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete all notifications for current user"""
    db.query(Notification).filter(
        Notification.user_id == current_user.id
    ).delete()
    db.commit()


# ============= Shares Endpoints =============

@router.post("/shares", response_model=ShareResponse, status_code=status.HTTP_201_CREATED)
async def share_post(
    share_data: ShareCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Share/repost a post"""
    # Check if post exists
    post = db.query(SocialPost).filter(SocialPost.id == share_data.post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )

    # Check if already shared
    existing_share = db.query(Share).filter(
        Share.user_id == current_user.id,
        Share.post_id == share_data.post_id
    ).first()

    if existing_share:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Post already shared"
        )

    # Create share
    new_share = Share(
        user_id=current_user.id,
        post_id=share_data.post_id,
        caption=share_data.caption
    )

    db.add(new_share)
    db.commit()
    db.refresh(new_share)

    return new_share


@router.delete("/shares/{share_id}", status_code=status.HTTP_204_NO_CONTENT)
async def unshare_post(
    share_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Remove a share"""
    share = db.query(Share).filter(
        Share.id == share_id,
        Share.user_id == current_user.id
    ).first()

    if not share:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Share not found"
        )

    db.delete(share)
    db.commit()


@router.get("/shares/my-shares", response_model=List[ShareResponse])
async def get_my_shares(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get current user's shares"""
    shares = db.query(Share).filter(
        Share.user_id == current_user.id
    ).order_by(desc(Share.created_at)).offset(
        (page - 1) * page_size
    ).limit(page_size).all()

    return shares


@router.get("/posts/{post_id}/shares", response_model=List[ShareResponse])
async def get_post_shares(
    post_id: int,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get users who shared a specific post"""
    # Check if post exists
    post = db.query(SocialPost).filter(SocialPost.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )

    shares = db.query(Share).filter(
        Share.post_id == post_id
    ).order_by(desc(Share.created_at)).offset(
        (page - 1) * page_size
    ).limit(page_size).all()

    return shares
