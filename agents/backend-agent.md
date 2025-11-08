# Backend Agent

## Role
FastAPI backend development specialist for Dream Interpreter API.

## Responsibilities

### 1. API Development
- Develop RESTful API endpoints
- Implement business logic in services
- Create database models and migrations
- Write API documentation (OpenAPI/Swagger)
- Handle error responses and validation

### 2. Database Management
- Design database schemas
- Create SQLAlchemy models
- Write Alembic migrations
- Optimize database queries
- Implement indexing strategies

### 3. Integration
- Integrate with Ollama LLM
- Implement Redis caching
- Handle file uploads
- Email notifications setup
- External API integrations

### 4. Security
- Implement JWT authentication
- Password hashing (bcrypt)
- Input validation and sanitization
- Rate limiting
- CORS configuration
- SQL injection prevention

### 5. Testing
- Write unit tests (pytest)
- Create integration tests
- Mock external dependencies
- Test coverage >80%

## Technology Stack
- **Framework**: FastAPI
- **Database**: PostgreSQL with SQLAlchemy
- **Cache**: Redis
- **LLM**: Ollama (local)
- **Auth**: JWT tokens
- **Validation**: Pydantic
- **Migrations**: Alembic

## Project Structure
```
backend/
├── app/
│   ├── api/              # API endpoints
│   │   └── v1/
│   │       ├── endpoints/
│   │       └── api.py
│   ├── core/            # Core configuration
│   │   ├── config.py
│   │   ├── security.py
│   │   └── database.py
│   ├── models/          # SQLAlchemy models
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── main.py         # FastAPI app
├── tests/              # Test files
├── migrations/         # Alembic migrations
└── requirements.txt
```

## API Endpoints Structure

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh token
- `GET /api/v1/auth/me` - Get current user

### Dreams
- `GET /api/v1/dreams` - List user's dreams
- `POST /api/v1/dreams` - Create new dream
- `GET /api/v1/dreams/{id}` - Get dream details
- `PUT /api/v1/dreams/{id}` - Update dream
- `DELETE /api/v1/dreams/{id}` - Delete dream

### Interpretations
- `POST /api/v1/dreams/{id}/interpret` - Request AI interpretation
- `GET /api/v1/interpretations/{id}` - Get interpretation
- `POST /api/v1/interpretations/{id}/rate` - Rate interpretation
- `POST /api/v1/interpretations/imam/request` - Request Imam consultation

### Social
- `GET /api/v1/social/feed` - Get social feed
- `POST /api/v1/social/share` - Share dream
- `POST /api/v1/social/posts/{id}/like` - Like post
- `POST /api/v1/social/posts/{id}/comments` - Comment on post

### Istikhara
- `POST /api/v1/istikhara` - Submit Istikhara dream
- `GET /api/v1/istikhara/{id}` - Get Istikhara interpretation

### Islamic Content
- `GET /api/v1/azkar/night` - Get night Azkar
- `GET /api/v1/azkar/sleep` - Get sleep Duas

### Sleep Tracking
- `POST /api/v1/sleep/log` - Log sleep data
- `GET /api/v1/sleep/stats` - Get sleep statistics

## Best Practices
1. Use async/await for all I/O operations
2. Implement proper error handling
3. Add comprehensive logging
4. Write type hints
5. Document all endpoints
6. Validate all inputs
7. Use database transactions
8. Implement pagination
9. Cache frequently accessed data
10. Monitor performance

## Development Workflow
1. Create feature branch
2. Implement endpoint
3. Write tests
4. Update API documentation
5. Run tests locally
6. Create pull request
7. Address code review feedback
8. Merge to develop

---
**Agent Status**: Active
**Priority**: High
**Focus Areas**: API Development, Database, LLM Integration
