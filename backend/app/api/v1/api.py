"""
API Router - Main router that includes all endpoint routers
"""
from fastapi import APIRouter

# Import routers
from app.api.v1.endpoints import azkar, sleep

# Future routers (to be implemented)
# from app.api.v1.endpoints import auth, dreams, interpretations, social, profile, imam, istikhara

api_router = APIRouter()

# Include implemented endpoint routers
api_router.include_router(azkar.router, prefix="/azkar", tags=["Islamic Azkar"])
api_router.include_router(sleep.router, prefix="/sleep", tags=["Sleep Guidance"])

# Include all endpoint routers (future)
# api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
# api_router.include_router(dreams.router, prefix="/dreams", tags=["Dreams"])
# api_router.include_router(interpretations.router, prefix="/interpretations", tags=["Interpretations"])
# api_router.include_router(social.router, prefix="/social", tags=["Social"])
# api_router.include_router(profile.router, prefix="/profile", tags=["Profile"])
# api_router.include_router(imam.router, prefix="/imam", tags=["Imam Consultation"])
# api_router.include_router(istikhara.router, prefix="/istikhara", tags=["Istikhara"])

# Health check endpoint
@api_router.get("/")
async def api_root():
    return {"message": "Dream Interpreter API v1"}
