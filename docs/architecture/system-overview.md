# Dream Interpreter - System Architecture Overview

## High-Level Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │◄────►│   Backend   │◄────►│  PostgreSQL │
│  React App  │      │   FastAPI   │      │   Database  │
│  Port 3001  │      │  Port 8001  │      │  Port 5433  │
└─────────────┘      └──────┬──────┘      └─────────────┘
                            │
                            ├──────►┌─────────────┐
                            │       │    Redis    │
                            │       │    Cache    │
                            │       │  Port 6380  │
                            │       └─────────────┘
                            │
                            └──────►┌─────────────┐
                                    │   Ollama    │
                                    │   LLM API   │
                                    │  Port 11434 │
                                    └─────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **State Management**: Zustand + React Query
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **UI Components**: Headless UI / Radix UI
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database ORM**: SQLAlchemy 2.0 (async)
- **Migrations**: Alembic
- **Authentication**: JWT (python-jose)
- **Password Hashing**: bcrypt
- **Validation**: Pydantic
- **ASGI Server**: Uvicorn

### Database
- **Primary**: PostgreSQL 15
- **Cache**: Redis 7
- **Connection Pool**: asyncpg

### LLM
- **Runtime**: Ollama
- **Model**: Llama 2 (fine-tuned)
- **API**: HTTP REST

### DevOps
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Version Control**: Git

## System Components

### 1. Frontend Application
**Responsibilities**:
- User interface rendering
- Client-side routing
- State management
- API communication
- Form validation
- Authentication flow

**Key Features**:
- Responsive design (mobile-first)
- PWA capabilities (future)
- Offline support (future)
- Real-time updates

### 2. Backend API
**Responsibilities**:
- RESTful API endpoints
- Business logic
- Authentication/Authorization
- Database operations
- LLM communication
- File handling

**Key Features**:
- Async request handling
- Connection pooling
- Rate limiting
- CORS handling
- Error handling
- Logging

### 3. PostgreSQL Database
**Responsibilities**:
- Persistent data storage
- Relational data management
- Transaction handling
- Data integrity

**Key Tables**:
- users, dreams, interpretations
- social_posts, comments, likes
- sleep_logs, azkar

### 4. Redis Cache
**Responsibilities**:
- Session storage
- API response caching
- Rate limit tracking
- Temporary data storage

**Use Cases**:
- User sessions (JWT blacklist)
- Frequently accessed data
- Feed caching
- Real-time features

### 5. Ollama LLM Service
**Responsibilities**:
- Dream interpretation
- Natural language processing
- Islamic knowledge application

**Features**:
- Local deployment
- Custom fine-tuning
- No data sharing
- Unlimited requests

## Data Flow

### Dream Interpretation Flow
```
1. User creates dream entry
   ↓
2. Frontend sends to Backend API
   ↓
3. Backend saves to PostgreSQL
   ↓
4. User requests interpretation
   ↓
5. Backend formats prompt
   ↓
6. Sends to Ollama LLM
   ↓
7. Ollama generates interpretation
   ↓
8. Backend saves interpretation
   ↓
9. Returns to Frontend
   ↓
10. User views interpretation
```

### Social Sharing Flow
```
1. User shares dream publicly
   ↓
2. Creates social_post entry
   ↓
3. Appears in community feed
   ↓
4. Other users like/comment
   ↓
5. Engagement counters updated
   ↓
6. Notifications sent
```

## Security Architecture

### Authentication
- JWT tokens (access + refresh)
- Secure httpOnly cookies
- Token expiration (30 min access, 7 day refresh)
- Password hashing (bcrypt, cost 12)

### Authorization
- Role-based access control (USER, IMAM, ADMIN)
- Resource ownership validation
- Privacy level enforcement

### Data Protection
- Input validation (Pydantic)
- SQL injection prevention (ORM)
- XSS protection (sanitization)
- CSRF tokens
- Rate limiting
- HTTPS only (production)

## Scalability Considerations

### Horizontal Scaling
- Stateless backend (easy to replicate)
- Load balancer ready
- Session in Redis (shared state)
- Database connection pooling

### Vertical Scaling
- Optimized queries
- Indexed tables
- Cached responses
- Async operations

### Performance Optimization
- CDN for static assets
- Image optimization
- Code splitting
- Lazy loading
- Database query optimization

## Deployment Architecture

### Development
```
Local Machine
├── Docker Compose
│   ├── Frontend (dev server)
│   ├── Backend (reload enabled)
│   ├── PostgreSQL
│   └── Redis
└── Ollama (host machine)
```

### Production
```
Cloud Infrastructure
├── Load Balancer
├── Frontend Containers (3+)
├── Backend Containers (3+)
├── PostgreSQL (managed service)
├── Redis (managed service)
└── Ollama (GPU instance)
```

## Monitoring & Observability

### Metrics
- Request rate
- Response time
- Error rate
- Database connections
- Cache hit ratio

### Logging
- Application logs (structured JSON)
- Access logs
- Error tracking
- Audit logs

### Alerting
- High error rates
- Slow responses
- Database issues
- Service downtime

---
**Document Version**: 1.0
**Last Updated**: 2024-01-15
**Next Review**: 2024-02-15
