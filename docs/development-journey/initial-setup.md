# Dream Interpreter - Initial Setup

**Date**: 2024-01-15  
**Phase**: Project Initialization  
**Status**: Completed

## Project Overview

Dream Interpreter is a comprehensive Islamic dream interpretation platform that combines traditional Islamic wisdom with modern AI technology. The platform enables users to:

1. Journal their dreams
2. Receive AI-powered interpretations
3. Consult with human Imams
4. Share dreams with the community
5. Track sleep quality
6. Access Islamic sleep guidance

## Technology Decisions

### Backend: FastAPI + Python
**Rationale**:
- High performance async framework
- Built-in OpenAPI documentation
- Type hints with Pydantic
- Large ecosystem
- Easy integration with ML/AI libraries

### Frontend: React + TypeScript + Tailwind
**Rationale**:
- Component-based architecture
- Strong typing with TypeScript
- Rapid UI development with Tailwind
- Large community and ecosystem
- Islamic design system capability

### Database: PostgreSQL
**Rationale**:
- Robust relational database
- JSONB support for flexible data
- Excellent performance
- ACID compliance
- Strong data integrity

### Cache: Redis
**Rationale**:
- In-memory speed
- Session management
- Rate limiting
- API response caching

### LLM: Ollama (Local)
**Rationale**:
- **Privacy**: User dreams stay on our servers
- **Cost**: No API fees, predictable infrastructure cost
- **Customization**: Fine-tuning for Islamic context
- **Control**: Full model control and optimization
- **No Limits**: Unlimited interpretations

## Custom Ports Configuration

To avoid conflicts with other Docker containers:
- **PostgreSQL**: 5433 (instead of 5432)
- **Redis**: 6380 (instead of 6379)
- **Backend API**: 8001 (instead of 8000)
- **Frontend**: 3001 (instead of 3000)
- **PgAdmin**: 5051 (instead of 5050)

## Project Structure

```
Dream Interpreter/
├── frontend/          # React application
├── backend/           # FastAPI application
├── db/                # Database schemas and seeds
├── ollama/            # LLM configuration (empty - using local)
├── docs/              # Comprehensive documentation
├── agents/            # Specialized agent configs
├── .github/workflows/ # CI/CD pipelines
├── docker-compose.yml # Service orchestration
└── README.md          # Main documentation
```

## Agent System

Created specialized agents for different aspects of the project:

1. **CI/CD Agent**: Automated testing and deployment
2. **Documentation Agent**: Technical documentation
3. **Development Journey Agent**: Progress tracking
4. **Frontend Agent**: React/UI development
5. **Backend Agent**: FastAPI development
6. **Design Agent**: UI/UX and Islamic aesthetics
7. **Database Agent**: Schema and optimization
8. **Social Agent**: Community features
9. **Content Agent**: Islamic content curation
10. **LLM Agent**: Model training and optimization

## Database Schema

### Core Tables
- **users**: Authentication and profiles
- **dreams**: Dream journal entries
- **interpretations**: AI and human interpretations
- **social_posts**: Shared dreams
- **comments**: Post comments
- **likes**: Post engagement
- **sleep_logs**: Sleep quality tracking
- **azkar**: Islamic supplications

### Key Relationships
- User → Dreams (1:many)
- Dream → Interpretations (1:many)
- Dream → SocialPost (1:1)
- SocialPost → Comments/Likes (1:many)

## Features Implemented

### MVP Foundation
✅ Project structure
✅ Docker configuration
✅ Database schema
✅ Backend API setup
✅ Frontend boilerplate
✅ Authentication structure
✅ LLM integration (Ollama service)
✅ Documentation framework
✅ CI/CD pipelines
✅ Agent specifications

## Next Steps for Claude Code Online

### Phase 1: Core Features (Priority: High)
1. **Authentication System**
   - User registration
   - Login/logout
   - JWT token management
   - Password reset

2. **Dream Journal**
   - Create dream entries
   - Edit/delete dreams
   - View dream history
   - Filter and search

3. **AI Interpretation**
   - Connect to Ollama
   - Prompt engineering
   - Display interpretations
   - Save interpretation history

4. **UI Development**
   - Landing page
   - Dashboard
   - Dream form
   - Interpretation view
   - Islamic design theme

### Phase 2: Enhanced Features
1. **Istikhara Dreams**
   - Specialized form
   - Custom interpretation
   - Decision context

2. **Islamic Content**
   - Azkar display
   - Sleep guidance
   - Quranic references

3. **Social Features**
   - Share dreams
   - Community feed
   - Like/comment system

### Phase 3: Advanced Features
1. **Imam Consultation**
   - Request system
   - Notification system
   - Human interpretation

2. **Sleep Tracking**
   - Log sleep data
   - Quality metrics
   - Insights and patterns

3. **Mobile Optimization**
   - Responsive design
   - PWA capabilities

## Development Workflow

### For Claude Code Online:

1. **Pick a feature** from the roadmap above
2. **Review agent docs** in `/agents/` for guidance
3. **Implement** backend endpoints first
4. **Create** frontend components
5. **Test** locally with Docker
6. **Commit** with descriptive messages
7. **Push** to GitHub
8. **CI/CD** will run automatically

### Git Workflow
```bash
# Pull latest changes
git pull origin main

# Create feature branch
git checkout -b feature/name

# Make changes and commit
git add .
git commit -m "feat: add feature description"

# Push to GitHub
git push origin feature/name

# Create Pull Request
```

## Environment Setup

The `.env.example` file contains all required configuration. Copy it to `.env` and adjust values:

```bash
cp .env.example .env
# Edit .env with your specific values
```

### Important Environment Variables:
- `SECRET_KEY`: Generate with `openssl rand -base64 32`
- `DATABASE_URL`: PostgreSQL connection string
- `OLLAMA_HOST`: Ollama API endpoint
- `REDIS_URL`: Redis connection string

## Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up -d --build

# Access database
docker exec -it dream-interpreter-db psql -U dream_user -d dream_interpreter
```

## Testing

### Backend
```bash
cd backend
pytest tests/ -v
```

### Frontend
```bash
cd frontend
npm test
```

## Resources

### Documentation
- `/docs/architecture/` - System design
- `/docs/api/` - API documentation
- `/docs/guides/` - Setup and user guides
- `/agents/` - Agent specifications

### External Resources
- FastAPI: https://fastapi.tiangolo.com/
- React: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/
- Ollama: https://ollama.ai/
- PostgreSQL: https://www.postgresql.org/docs/

## Success Metrics

- [ ] All services running successfully
- [ ] API documentation accessible at http://localhost:8001/docs
- [ ] Frontend loading at http://localhost:3001
- [ ] Database schema deployed
- [ ] Ollama responding to requests
- [ ] CI/CD pipeline passing

## Notes for Next Developer

1. **Read the README.md** first for quick start
2. **Check agent docs** for specialized guidance
3. **Follow the roadmap** in this document
4. **Use custom ports** as specified to avoid conflicts
5. **Test with Docker** before committing
6. **Document decisions** in development journey
7. **Islamic authenticity** is crucial - consult scholars
8. **User privacy** is paramount - especially with dreams
9. **Performance** matters - optimize queries and caching
10. **Community** is key - build engaging features

## Budget & Resources

- $250 credit available for Claude Code Online
- Ollama running locally (no API costs)
- Free tier services where possible
- Optimize for cost-efficiency

---

**Setup Status**: ✅ Complete  
**Ready for Development**: ✅ Yes  
**Next Developer**: Claude Code Online

**May Allah bless this project and make it beneficial for the Ummah. Ameen.** 🤲
