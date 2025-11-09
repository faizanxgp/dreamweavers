# Social Features Setup Guide

This guide will help you set up and configure the social features for the Dream Interpreter platform.

## Prerequisites

Before setting up social features, ensure you have:
- PostgreSQL 15+ installed and running
- Python backend set up and running
- Initial database schema (`001_initial_schema.sql`) already applied

## Database Setup

### 1. Apply Social Features Schema

Run the social features migration script:

```bash
# Navigate to project root
cd /path/to/dreamweavers

# Apply the schema
psql -U postgres -d dream_interpreter < db/schemas/002_social_features.sql
```

This will create:
- **Tables**: followers, shares, notifications, mentions
- **Triggers**: Automatic counter updates and notification creation
- **Constraints**: Data integrity rules
- **Indexes**: Performance optimization

### 2. Verify Installation

Check that all tables were created:

```bash
psql -U postgres -d dream_interpreter -c "\dt"
```

You should see:
- azkar
- comments
- dreams
- **followers** ✨
- interpretations
- likes
- **mentions** ✨
- **notifications** ✨
- **shares** ✨
- sleep_logs
- social_posts
- users

### 3. Verify Triggers

Check that triggers are installed:

```bash
psql -U postgres -d dream_interpreter -c "
SELECT
    trigger_name,
    event_object_table,
    action_timing,
    event_manipulation
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;
"
```

You should see triggers for:
- `update_follower_counter` on `followers`
- `update_shares_counter` on `shares`
- `notify_on_follow`, `notify_on_like`, `notify_on_comment`, `notify_on_share`
- Counter update triggers for `likes` and `comments`

## Backend Configuration

### 1. Update Dependencies

Ensure your `requirements.txt` includes:

```txt
fastapi>=0.104.0
sqlalchemy>=2.0.0
pydantic>=2.0.0
psycopg2-binary>=2.9.0
uvicorn>=0.24.0
```

Install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Database Connection

Ensure your `.env` file has the correct database connection:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/dream_interpreter
```

### 3. Implement Authentication (Required)

The social features APIs require authentication. You need to implement:

**Option A: JWT Authentication (Recommended)**

Create `backend/app/core/auth.py`:

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from sqlalchemy.orm import Session
import jwt

from app.core.config import settings
from app.models import User
from app.core.database import get_db

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """Get current authenticated user from JWT token"""
    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.SECRET_KEY,
            algorithms=["HS256"]
        )
        user_id: int = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials"
            )
    except jwt.JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return user
```

**Option B: Session-based Authentication**

Implement session management using cookies.

### 4. Implement Database Session

Create `backend/app/core/database.py`:

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db() -> Session:
    """Get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### 5. Update Endpoint Dependencies

Replace the placeholder dependencies in:
- `backend/app/api/v1/endpoints/social.py`
- `backend/app/api/v1/endpoints/followers.py`
- `backend/app/api/v1/endpoints/notifications.py`

Change from:
```python
async def get_db() -> Session:
    raise HTTPException(...)

async def get_current_user(db: Session = Depends(get_db)) -> User:
    raise HTTPException(...)
```

To:
```python
from app.core.database import get_db
from app.core.auth import get_current_user
```

## Testing the APIs

### 1. Start the Backend

```bash
cd backend
uvicorn app.main:app --reload
```

### 2. Access API Documentation

Open your browser to:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### 3. Test Endpoints

Use the Swagger UI to test endpoints:

1. **Authenticate** (create a user and login first)
2. **Create a Post**: `POST /api/v1/social/posts`
3. **Like a Post**: `POST /api/v1/social/posts/{post_id}/like`
4. **Comment**: `POST /api/v1/social/comments`
5. **Follow User**: `POST /api/v1/social/users/{user_id}/follow`
6. **Get Notifications**: `GET /api/v1/social/notifications`

### 4. Example API Calls

**Create a Post:**
```bash
curl -X POST "http://localhost:8000/api/v1/social/posts" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "dream_id": 1,
    "caption": "Had an amazing dream!",
    "interpretation_included": false
  }'
```

**Get Feed:**
```bash
curl "http://localhost:8000/api/v1/social/posts?page=1&page_size=20" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Follow a User:**
```bash
curl -X POST "http://localhost:8000/api/v1/social/users/5/follow" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Monitoring & Maintenance

### Check Counter Accuracy

Periodically verify that denormalized counters are accurate:

```sql
-- Check posts counters
SELECT
    sp.id,
    sp.likes_count,
    COUNT(DISTINCT l.id) as actual_likes,
    sp.comments_count,
    COUNT(DISTINCT c.id) as actual_comments,
    sp.shares_count,
    COUNT(DISTINCT s.id) as actual_shares
FROM social_posts sp
LEFT JOIN likes l ON l.post_id = sp.id
LEFT JOIN comments c ON c.post_id = sp.id
LEFT JOIN shares s ON s.post_id = sp.id
GROUP BY sp.id
HAVING
    sp.likes_count != COUNT(DISTINCT l.id) OR
    sp.comments_count != COUNT(DISTINCT c.id) OR
    sp.shares_count != COUNT(DISTINCT s.id);

-- Check user counters
SELECT
    u.id,
    u.username,
    u.followers_count,
    COUNT(DISTINCT f1.id) as actual_followers,
    u.following_count,
    COUNT(DISTINCT f2.id) as actual_following
FROM users u
LEFT JOIN followers f1 ON f1.following_id = u.id
LEFT JOIN followers f2 ON f2.follower_id = u.id
GROUP BY u.id
HAVING
    u.followers_count != COUNT(DISTINCT f1.id) OR
    u.following_count != COUNT(DISTINCT f2.id);
```

### Performance Optimization

If you notice slow queries, consider:

1. **Add more indexes** for common query patterns
2. **Implement caching** using Redis for frequently accessed data
3. **Use pagination** always (already implemented)
4. **Implement cursor-based pagination** for large datasets

### Backup Recommendations

Regular backups are crucial:

```bash
# Backup social features data
pg_dump -U postgres -d dream_interpreter \
  -t followers -t shares -t notifications -t mentions \
  > social_features_backup.sql
```

## Troubleshooting

### Issue: Counters are incorrect

**Solution:** Rebuild counters manually:

```sql
-- Rebuild post counters
UPDATE social_posts sp SET
    likes_count = (SELECT COUNT(*) FROM likes WHERE post_id = sp.id),
    comments_count = (SELECT COUNT(*) FROM comments WHERE post_id = sp.id),
    shares_count = (SELECT COUNT(*) FROM shares WHERE post_id = sp.id);

-- Rebuild user counters
UPDATE users u SET
    followers_count = (SELECT COUNT(*) FROM followers WHERE following_id = u.id),
    following_count = (SELECT COUNT(*) FROM followers WHERE follower_id = u.id);
```

### Issue: Notifications not being created

**Solution:** Check that triggers are installed:

```sql
-- List all triggers
\dS+ followers
\dS+ likes
\dS+ comments
\dS+ shares
```

### Issue: 501 Not Implemented errors

**Solution:** Implement the authentication and database dependencies as described in the "Backend Configuration" section.

## Next Steps

1. ✅ Database schema installed
2. ✅ Backend models created
3. ✅ API endpoints configured
4. ⏳ Implement authentication (JWT/Sessions)
5. ⏳ Implement database session management
6. ⏳ Create frontend components for social features
7. ⏳ Add real-time updates using WebSockets
8. ⏳ Implement rate limiting
9. ⏳ Add content moderation tools

## Resources

- [Social Features API Documentation](SOCIAL_FEATURES_API.md)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Support

For issues or questions:
1. Check the API documentation: `docs/SOCIAL_FEATURES_API.md`
2. Review the database schema: `db/schemas/002_social_features.sql`
3. Open an issue on GitHub with details about your problem
