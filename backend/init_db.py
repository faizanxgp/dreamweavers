"""
Initialize database tables
"""
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine

from app.core.config import settings
from app.models.base import Base
from app.models import User, Dream, Interpretation, SocialPost, Comment, Like


async def init_db():
    """
    Create all database tables
    """
    print(f"Creating database tables...")
    print(f"Database URL: {settings.DATABASE_URL}")

    engine = create_async_engine(
        settings.DATABASE_URL,
        echo=True,
    )

    async with engine.begin() as conn:
        # Drop all tables (use with caution!)
        # await conn.run_sync(Base.metadata.drop_all)

        # Create all tables
        await conn.run_sync(Base.metadata.create_all)

    await engine.dispose()

    print("Database tables created successfully!")


if __name__ == "__main__":
    asyncio.run(init_db())
