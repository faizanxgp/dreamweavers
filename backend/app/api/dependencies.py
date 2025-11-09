"""
API dependencies for authentication and authorization
"""
from typing import Optional
from fastapi import Header, HTTPException, status


async def get_current_user_id(
    x_user_id: Optional[str] = Header(None, description="User ID for testing")
) -> int:
    """
    Simple dependency to get current user ID from header
    In production, this should validate JWT tokens and extract user ID

    For now, we use a header-based approach for testing
    """
    if not x_user_id:
        # Default to user ID 1 for testing
        return 1

    try:
        return int(x_user_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )


async def get_optional_user_id(
    x_user_id: Optional[str] = Header(None)
) -> Optional[int]:
    """
    Optional user ID for public endpoints
    """
    if not x_user_id:
        return None

    try:
        return int(x_user_id)
    except ValueError:
        return None
