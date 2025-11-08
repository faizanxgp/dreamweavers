# Getting Started with Dream Interpreter

## Introduction

Welcome to Dream Interpreter, an Islamic dream interpretation platform that combines traditional Islamic wisdom with modern AI technology.

## Prerequisites

### Required Software
- **Docker** & **Docker Compose** (recommended)
- **Git**
- **Node.js** 18+ (for local development)
- **Python** 3.11+ (for local development)
- **PostgreSQL** 15+ (if not using Docker)
- **Redis** 7+ (if not using Docker)
- **Ollama** (for LLM)

### Knowledge Requirements
- Basic understanding of REST APIs
- Familiarity with React (for frontend)
- Familiarity with Python/FastAPI (for backend)
- Understanding of Docker (helpful)

## Quick Start (Docker - Recommended)

### 1. Clone the Repository
```bash
git clone https://github.com/faizanxgp/dreamweavers.git
cd dreamweavers
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start All Services
```bash
docker-compose up -d
```

### 4. Access the Application
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8001
- **API Documentation**: http://localhost:8001/docs
- **PgAdmin** (optional): http://localhost:5051

### 5. Set Up Ollama (Local)
```bash
# Install Ollama from https://ollama.ai
ollama pull llama2

# Verify it's running
curl http://localhost:11434/api/tags
```

## Manual Setup (Without Docker)

### 1. Set Up Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up database
createdb dream_interpreter

# Run migrations
alembic upgrade head

# Start backend server
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

### 2. Set Up Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Set Up PostgreSQL
```bash
# Create database
createdb dream_interpreter

# Run schema
psql dream_interpreter < db/schemas/001_initial_schema.sql

# Run seeds
psql dream_interpreter < db/seeds/001_azkar_seed.sql
```

### 4. Set Up Redis
```bash
redis-server --port 6380
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Environment
ENVIRONMENT=development
DEBUG=True

# Database
POSTGRES_SERVER=localhost
POSTGRES_USER=dream_user
POSTGRES_PASSWORD=dream_password
POSTGRES_DB=dream_interpreter
POSTGRES_PORT=5433

# Redis
REDIS_HOST=localhost
REDIS_PORT=6380
REDIS_DB=0

# Ollama
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama2

# Security
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# API
VITE_API_URL=http://localhost:8001/api/v1
```

## Verify Installation

### Check Backend
```bash
curl http://localhost:8001/health
# Expected: {"status":"healthy"}
```

### Check Frontend
Open http://localhost:3001 in your browser

### Check Database
```bash
docker exec dream-interpreter-db psql -U dream_user -d dream_interpreter -c "\dt"
```

### Check Ollama
```bash
curl http://localhost:11434/api/tags
```

## Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Backend: Edit files in `backend/app/`
- Frontend: Edit files in `frontend/src/`

### 3. Test Locally
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

### 4. Commit Changes
```bash
git add .
git commit -m "feat: add your feature"
```

### 5. Push and Create PR
```bash
git push origin feature/your-feature-name
# Create Pull Request on GitHub
```

## Common Tasks

### Add New API Endpoint
1. Create route in `backend/app/api/v1/endpoints/`
2. Add to router in `backend/app/api/v1/api.py`
3. Test endpoint at http://localhost:8001/docs

### Add New React Component
1. Create component in `frontend/src/components/`
2. Import and use in pages or other components
3. Apply Tailwind CSS styling

### Database Migration
```bash
cd backend
alembic revision -m "description"
# Edit migration file
alembic upgrade head
```

### Add New Dependencies

**Backend**:
```bash
pip install package-name
pip freeze > requirements.txt
```

**Frontend**:
```bash
npm install package-name
```

## Troubleshooting

### Port Already in Use
```bash
# Check what's using the port
lsof -i :3001  # or 8001, 5433, 6380

# Stop the process or change port in docker-compose.yml
```

### Database Connection Error
- Verify PostgreSQL is running
- Check credentials in .env
- Ensure database exists

### Ollama Not Responding
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Restart Ollama service
# Download model if missing
ollama pull llama2
```

### Docker Issues
```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Rebuild containers
docker-compose up -d --build
```

## Next Steps

1. Read the [User Guide](user-guide.md)
2. Explore [API Documentation](../api/README.md)
3. Check [Development Guide](developer-guide.md)
4. Review [Agent Documentation](../../agents/)

## Getting Help

- **Issues**: Open an issue on GitHub
- **Documentation**: Check docs/ folder
- **API Docs**: http://localhost:8001/docs
- **Agents**: Refer to specialized agents in agents/ folder

---
**Happy Coding! 🚀**
