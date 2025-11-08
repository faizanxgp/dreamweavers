# Authentication and Dream Journal API - Setup Guide

This guide explains how to set up and test the Authentication and Dream Journal CRUD APIs.

## Features Implemented

### 1. Authentication System
- **User Registration** (`POST /api/v1/auth/register`)
  - Create new user accounts with email, username, and password
  - Returns JWT access token upon successful registration
  - Validates unique email and username

- **User Login** (`POST /api/v1/auth/login`)
  - Authenticate with email and password
  - Returns JWT access token for authenticated sessions

- **Get Current User** (`GET /api/v1/auth/me`)
  - Retrieve current authenticated user's information
  - Requires Bearer token authentication

### 2. Dream Journal CRUD Operations
- **Create Dream** (`POST /api/v1/dreams/`)
  - Create new dream journal entries
  - Supports multiple fields: title, description, dream type, privacy, emotions, symbols, colors, people, tags, etc.

- **Get All Dreams** (`GET /api/v1/dreams/`)
  - Retrieve all dreams for the authenticated user
  - Supports pagination (page, page_size parameters)
  - Returns dreams ordered by creation date (newest first)

- **Get Dream by ID** (`GET /api/v1/dreams/{dream_id}`)
  - Retrieve a specific dream by ID
  - User can only access their own dreams

- **Update Dream** (`PUT /api/v1/dreams/{dream_id}`)
  - Update existing dream entries
  - Partial updates supported (only update fields provided)

- **Delete Dream** (`DELETE /api/v1/dreams/{dream_id}`)
  - Delete a dream entry
  - User can only delete their own dreams

## Setup Instructions

### Option 1: Using Docker (Recommended)

1. **Start the services:**
   ```bash
   docker compose up -d
   ```

2. **Initialize the database:**
   ```bash
   docker compose exec backend python init_db.py
   ```

3. **Access the API:**
   - API: http://localhost:8001
   - API Docs (Swagger): http://localhost:8001/docs
   - ReDoc: http://localhost:8001/redoc

### Option 2: Local Development

1. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

2. **Install dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Start PostgreSQL and Redis:**
   Ensure PostgreSQL (port 5432) and Redis (port 6379) are running locally.

4. **Initialize the database:**
   ```bash
   python init_db.py
   ```

5. **Start the backend server:**
   ```bash
   uvicorn app.main:app --reload --port 8001
   ```

6. **Access the API:**
   - API: http://localhost:8001
   - API Docs: http://localhost:8001/docs

## Testing the API

### Using the Test Script

A comprehensive test script is provided to test all endpoints:

```bash
cd backend
python test_api.py
```

This will:
1. Register a new user
2. Login (if registration fails)
3. Get current user info
4. Create a dream
5. List all dreams
6. Get dream by ID
7. Update the dream
8. Delete the dream

### Using curl

#### Register a User
```bash
curl -X POST "http://localhost:8001/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "username",
    "password": "password123",
    "full_name": "John Doe"
  }'
```

#### Login
```bash
curl -X POST "http://localhost:8001/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

#### Create a Dream
```bash
curl -X POST "http://localhost:8001/api/v1/dreams/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "title": "Flying Dream",
    "description": "I was flying over mountains",
    "dream_type": "regular",
    "privacy": "private",
    "emotions": ["joy", "freedom"],
    "symbols": ["mountains", "flying"],
    "tags": ["nature"]
  }'
```

#### Get All Dreams
```bash
curl -X GET "http://localhost:8001/api/v1/dreams/?page=1&page_size=10" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Using Swagger UI

The easiest way to test is using the interactive Swagger documentation:

1. Open http://localhost:8001/docs
2. Click "Authorize" button
3. Enter your Bearer token (get it from register/login response)
4. Try out the endpoints interactively

## Architecture

### Database Models
- **User**: Email, username, hashed password, profile info, roles
- **Dream**: Title, description, dream type, privacy, emotions, symbols, colors, people, tags, timestamps

### Security
- Passwords are hashed using bcrypt
- JWT tokens for authentication (30-minute expiration by default)
- Bearer token authentication for protected routes
- User can only access/modify their own dreams

### API Structure
```
backend/
├── app/
│   ├── api/v1/
│   │   ├── endpoints/
│   │   │   ├── auth.py         # Authentication endpoints
│   │   │   └── dreams.py       # Dream CRUD endpoints
│   │   └── api.py              # Main API router
│   ├── core/
│   │   ├── config.py           # Configuration
│   │   ├── database.py         # Database session
│   │   ├── dependencies.py     # Auth dependencies
│   │   └── security.py         # Security utilities
│   ├── models/
│   │   ├── user.py             # User model
│   │   └── dream.py            # Dream model
│   ├── schemas/
│   │   ├── user.py             # User schemas
│   │   └── dream.py            # Dream schemas
│   └── main.py                 # FastAPI app
├── init_db.py                  # Database initialization
└── test_api.py                 # API test script
```

## Environment Variables

Key environment variables (see `.env` file):

```env
# Database
POSTGRES_USER=dream_user
POSTGRES_PASSWORD=dream_password
POSTGRES_DB=dream_interpreter

# Security
SECRET_KEY=your-secret-key-here

# API
DEBUG=True
ENVIRONMENT=development
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running on port 5432 (or 5433 for Docker)
- Check DATABASE_URL in your environment

### Authentication Issues
- Ensure you're including the Bearer token in the Authorization header
- Tokens expire after 30 minutes by default

### Import Errors
- Make sure all dependencies are installed: `pip install -r requirements.txt`

## Next Steps

Additional features that can be added:
- Email verification for new users
- Password reset functionality
- Dream interpretation endpoints
- Social features (sharing dreams)
- Sleep tracking integration
- Search and filter dreams
- Export dreams to PDF/JSON
