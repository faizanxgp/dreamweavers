"""
API Router - Main router that includes all endpoint routers
"""
from fastapi import APIRouter

# Import social feature routers
from app.api.v1.endpoints import social, followers, notifications

# Import other routers (to be created)
# from app.api.v1.endpoints import auth, dreams, interpretations, profile, imam, istikhara, azkar, sleep

api_router = APIRouter()

# Include social feature routers
api_router.include_router(social.router, prefix="/social", tags=["Social Posts"])
api_router.include_router(followers.router, prefix="/social", tags=["Followers"])
api_router.include_router(notifications.router, prefix="/social", tags=["Notifications"])

# Include other endpoint routers (to be created)
# api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
# api_router.include_router(dreams.router, prefix="/dreams", tags=["Dreams"])
# api_router.include_router(interpretations.router, prefix="/interpretations", tags=["Interpretations"])
# api_router.include_router(profile.router, prefix="/profile", tags=["Profile"])
# api_router.include_router(imam.router, prefix="/imam", tags=["Imam Consultation"])
# api_router.include_router(istikhara.router, prefix="/istikhara", tags=["Istikhara"])
# api_router.include_router(azkar.router, prefix="/azkar", tags=["Azkar"])
# api_router.include_router(sleep.router, prefix="/sleep", tags=["Sleep Tracking"])

# Health check endpoint
@api_router.get("/")
async def api_root():
    return {"message": "Dream Interpreter API v1"}
