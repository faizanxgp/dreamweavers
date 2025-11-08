# Social Features API Documentation

This document describes the social features APIs for the Dream Interpreter Platform.

## Overview

The social features enable users to:
- Share dreams publicly as social posts
- Like, comment, and share posts
- Follow/unfollow other users
- Receive notifications for social activities
- Mention users in comments

## Database Schema

### New Tables

1. **followers** - User follow relationships
2. **shares** - Post shares/reposts
3. **notifications** - User notifications
4. **mentions** - User mentions in comments/posts

### Extended Tables

- **social_posts** - Added `shares_count` field
- **users** - Added `followers_count` and `following_count` fields

## API Endpoints

All social feature endpoints are prefixed with `/api/v1/social`

### Social Posts

#### Create a Post
```http
POST /api/v1/social/posts
Content-Type: application/json

{
  "dream_id": 123,
  "caption": "Optional caption for the post",
  "interpretation_included": false
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "user_id": 5,
  "dream_id": 123,
  "caption": "Optional caption",
  "interpretation_included": false,
  "likes_count": 0,
  "comments_count": 0,
  "shares_count": 0,
  "is_flagged": false,
  "is_hidden": false,
  "created_at": "2025-11-08T12:00:00Z",
  "updated_at": "2025-11-08T12:00:00Z"
}
```

#### Get Posts (Feed)
```http
GET /api/v1/social/posts?page=1&page_size=20&user_id=5
```

Query Parameters:
- `page` (default: 1) - Page number
- `page_size` (default: 20, max: 100) - Items per page
- `user_id` (optional) - Filter by specific user

**Response:** `200 OK`
```json
{
  "posts": [...],
  "total": 100,
  "page": 1,
  "page_size": 20,
  "has_more": true
}
```

#### Get Single Post
```http
GET /api/v1/social/posts/{post_id}
```

#### Update Post
```http
PATCH /api/v1/social/posts/{post_id}
Content-Type: application/json

{
  "caption": "Updated caption",
  "interpretation_included": true
}
```

#### Delete Post
```http
DELETE /api/v1/social/posts/{post_id}
```

**Response:** `204 No Content`

---

### Comments

#### Create Comment
```http
POST /api/v1/social/comments
Content-Type: application/json

{
  "post_id": 1,
  "text": "Great dream!",
  "parent_comment_id": null
}
```

**Note:** Set `parent_comment_id` for nested replies.

#### Get Post Comments
```http
GET /api/v1/social/posts/{post_id}/comments
```

Returns top-level comments with nested replies.

#### Update Comment
```http
PATCH /api/v1/social/comments/{comment_id}
Content-Type: application/json

{
  "text": "Updated comment text"
}
```

#### Delete Comment
```http
DELETE /api/v1/social/comments/{comment_id}
```

---

### Likes

#### Like a Post
```http
POST /api/v1/social/posts/{post_id}/like
```

**Response:** `201 Created`

#### Unlike a Post
```http
DELETE /api/v1/social/posts/{post_id}/like
```

**Response:** `204 No Content`

#### Get Post Likes
```http
GET /api/v1/social/posts/{post_id}/likes?page=1&page_size=20
```

Returns list of users who liked the post.

---

### Followers

#### Follow a User
```http
POST /api/v1/social/users/{user_id}/follow
```

**Response:** `201 Created`

#### Unfollow a User
```http
DELETE /api/v1/social/users/{user_id}/follow
```

**Response:** `204 No Content`

#### Get Followers
```http
GET /api/v1/social/users/{user_id}/followers?page=1&page_size=20
```

Returns list of users following the specified user.

**Response:** `200 OK`
```json
[
  {
    "id": 10,
    "username": "john_doe",
    "full_name": "John Doe",
    "avatar_url": "https://...",
    "bio": "Bio text",
    "followers_count": 150,
    "following_count": 200,
    "is_following": true,
    "followed_at": "2025-11-08T12:00:00Z"
  }
]
```

#### Get Following
```http
GET /api/v1/social/users/{user_id}/following?page=1&page_size=20
```

Returns list of users that the specified user is following.

#### Check Follow Status
```http
GET /api/v1/social/users/{user_id}/is-following/{target_user_id}
```

**Response:** `200 OK`
```json
{
  "is_following": true
}
```

#### Search Users
```http
GET /api/v1/social/users/search?q=john&page=1&page_size=20
```

Search users by username or full name.

---

### Shares

#### Share a Post
```http
POST /api/v1/social/shares
Content-Type: application/json

{
  "post_id": 1,
  "caption": "Optional comment when sharing"
}
```

**Response:** `201 Created`

#### Unshare a Post
```http
DELETE /api/v1/social/shares/{share_id}
```

**Response:** `204 No Content`

#### Get My Shares
```http
GET /api/v1/social/shares/my-shares?page=1&page_size=20
```

Returns current user's shares.

#### Get Post Shares
```http
GET /api/v1/social/posts/{post_id}/shares?page=1&page_size=20
```

Returns list of users who shared a specific post.

---

### Notifications

#### Get Notifications
```http
GET /api/v1/social/notifications?page=1&page_size=20&unread_only=false
```

Query Parameters:
- `page` - Page number
- `page_size` - Items per page
- `unread_only` - Only return unread notifications

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "user_id": 5,
    "type": "like",
    "title": "New Like",
    "message": "john_doe liked your post",
    "actor_id": 10,
    "post_id": 1,
    "comment_id": null,
    "dream_id": null,
    "interpretation_id": null,
    "is_read": false,
    "created_at": "2025-11-08T12:00:00Z",
    "actor_username": "john_doe",
    "actor_avatar": "https://..."
  }
]
```

#### Get Unread Count
```http
GET /api/v1/social/notifications/unread-count
```

**Response:** `200 OK`
```json
{
  "unread_count": 5
}
```

#### Mark Notification as Read
```http
PATCH /api/v1/social/notifications/{notification_id}
Content-Type: application/json

{
  "is_read": true
}
```

#### Mark All as Read
```http
POST /api/v1/social/notifications/mark-all-read
```

**Response:** `200 OK`
```json
{
  "updated_count": 10
}
```

#### Delete Notification
```http
DELETE /api/v1/social/notifications/{notification_id}
```

#### Delete All Notifications
```http
DELETE /api/v1/social/notifications
```

---

### User Stats

#### Get User Social Statistics
```http
GET /api/v1/social/users/{user_id}/stats
```

**Response:** `200 OK`
```json
{
  "followers_count": 150,
  "following_count": 200,
  "posts_count": 45,
  "likes_received": 320,
  "comments_received": 180,
  "shares_received": 25
}
```

---

## Notification Types

- `follow` - Someone followed you
- `like` - Someone liked your post
- `comment` - Someone commented on your post
- `share` - Someone shared your post
- `mention` - Someone mentioned you
- `interpretation_received` - New interpretation on your dream
- `imam_assigned` - Imam assigned to your istikhara

---

## Database Triggers

The system automatically handles:

1. **Counter Updates**
   - Post likes/comments/shares counts
   - User followers/following counts

2. **Automatic Notifications**
   - New follower notifications
   - Like notifications
   - Comment notifications
   - Share notifications

3. **Data Integrity**
   - Prevents self-follows
   - Ensures unique relationships
   - Cascading deletes

---

## Authentication

All endpoints require authentication. The authentication system needs to be implemented with:

- JWT tokens or session-based auth
- Current user extraction from request
- Database session management

**TODO:** Implement the following dependency functions in each endpoint file:
- `get_db()` - Database session
- `get_current_user()` - Authenticated user

---

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Already following this user"
}
```

### 401 Unauthorized
```json
{
  "detail": "Not authenticated"
}
```

### 404 Not Found
```json
{
  "detail": "Post not found"
}
```

### 501 Not Implemented
```json
{
  "detail": "Database session not configured"
}
```

---

## Next Steps

1. **Implement Authentication**
   - Create auth endpoints
   - Add JWT token support
   - Implement get_current_user dependency

2. **Implement Database Session**
   - Create database connection
   - Add get_db dependency
   - Configure connection pooling

3. **Run Migrations**
   ```bash
   # Apply the database schema
   psql -U postgres -d dreamweaver_db < db/schemas/001_initial_schema.sql
   psql -U postgres -d dreamweaver_db < db/schemas/002_social_features.sql
   ```

4. **Test Endpoints**
   - Use Swagger UI at `/docs`
   - Test with Postman or similar tool

5. **Add Rate Limiting**
   - Implement rate limits for API endpoints
   - Prevent abuse and spam

6. **Add Moderation Features**
   - Implement flagging system
   - Add admin moderation endpoints
