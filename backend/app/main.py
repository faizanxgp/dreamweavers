"""
Dream Interpreter - Main FastAPI Application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from loguru import logger

from app.core.config import settings
from app.api.v1.api import api_router

# Initialize FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Islamic Dream Interpretation Platform API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add trusted host middleware for production
if settings.ENVIRONMENT == "production":
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=settings.ALLOWED_HOSTS
    )

# Include API router
app.include_router(api_router, prefix="/api/v1")


@app.on_event("startup")
async def startup_event():
    """
    Application startup event handler
    """
    logger.info(f"Starting {settings.PROJECT_NAME}")
    logger.info(f"Environment: {settings.ENVIRONMENT}")
    logger.info(f"Debug mode: {settings.DEBUG}")

    # Initialize database connection pool
    # Initialize Redis connection

    # Check Ollama connection
    from app.services.ollama_service import ollama_service

    logger.info(f"Checking Ollama service at {settings.OLLAMA_HOST}...")
    ollama_healthy = await ollama_service.check_health()

    if ollama_healthy:
        logger.info(f"✓ Ollama service is running (model: {settings.OLLAMA_MODEL})")
    else:
        logger.warning(f"⚠ Ollama service is not available at {settings.OLLAMA_HOST}")
        logger.warning("Dream interpretation features will not work until Ollama is running")
        logger.warning("To start Ollama: ollama serve")

    logger.info("Application startup complete")


@app.on_event("shutdown")
async def shutdown_event():
    """
    Application shutdown event handler
    """
    logger.info("Shutting down application")
    # Close database connections
    # Close Redis connections
    logger.info("All connections closed")


@app.get("/")
async def root():
    """
    Root endpoint - Health check
    """
    return {
        "message": "Dream Interpreter API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """
    Health check endpoint for monitoring
    """
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT
    }
