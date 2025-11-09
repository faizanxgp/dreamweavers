# Dream Interpreter - Islamic Dream Interpretation Platform

## Overview

Dream Interpreter is a comprehensive Islamic dream interpretation platform that combines modern technology with traditional Islamic wisdom. The app provides AI-powered dream interpretation, community engagement, sleep quality tracking, and Islamic guidance for better sleep and spiritual connection.

## Features

### ✅ Implemented Features

#### **Istikhara Dream Interpretation**
Submit dreams seen after performing Salat al-Istikhara and receive AI-powered interpretations based on classical Islamic traditions. [📖 Read Full Documentation](./docs/ISTIKHARA_FEATURE.md)

**Key Features:**
- Comprehensive input form with emotions, symbols, and colors
- AI-powered analysis using Ollama LLM with specialized Islamic prompting
- Spiritual guidance with balanced interpretation
- Privacy controls (private, friends, public)
- Beautiful Islamic-themed UI

**How to Use:**
1. Navigate to `/istikhara` in the application
2. Fill out the dream form with decision context
3. Submit and receive instant AI interpretation
4. View interpretation with Islamic guidance and reminders

### 🚧 Planned Features

- **Dream Journal**: Personal, secure dream journaling with rich text support
- **AI Dream Interpretation**: Instant dream interpretation for all dream types using fine-tuned LLM (Ollama)
- **Human Imam Consultation**: Request interpretation from certified Islamic scholars
- **Social Community**: Share dreams, like, comment, and connect with other dreamers
- **Sleep Quality Tracking**: Monitor and improve sleep patterns
- **Islamic Sleep Guidance**:
  - Night Azkar (remembrance and prayers)
  - Sleep etiquette according to Sunnah
  - Duas for peaceful sleep
  - Islamic dream symbolism database

## Technology Stack

### Backend
- **Language**: Python 3.11+
- **Framework**: FastAPI
- **Database**: PostgreSQL 15+
- **Cache/Queue**: Redis 7+
- **LLM**: Ollama (local deployment)
- **Authentication**: JWT
- **ORM**: SQLAlchemy 2.0

### Frontend
- **Framework**: React 18+
- **Styling**: Tailwind CSS 3+
- **State Management**: Redux Toolkit / Zustand
- **HTTP Client**: Axios
- **UI Components**: Headless UI / Radix UI
- **Icons**: Lucide React / Heroicons
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation

### DevOps & Infrastructure
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Version Control**: Git & GitHub
- **API Documentation**: OpenAPI (Swagger)

## Project Structure

```
Dream Interpreter/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   ├── assets/         # Images, fonts, etc.
│   │   └── styles/         # Global styles
│   └── public/             # Static assets
│
├── backend/                 # Python FastAPI backend
│   ├── app/
│   │   ├── api/           # API routes and endpoints
│   │   ├── models/        # SQLAlchemy models
│   │   ├── services/      # Business logic
│   │   ├── core/          # Core configuration
│   │   └── utils/         # Utility functions
│   ├── tests/             # Backend tests
│   └── migrations/        # Database migrations
│
├── db/                     # Database related files
│   ├── schemas/           # SQL schemas
│   ├── migrations/        # SQL migrations
│   └── seeds/             # Seed data
│
├── ollama/                # Ollama LLM configuration (empty - using local)
│
├── docs/                  # Project documentation
│   ├── architecture/      # Architecture diagrams & docs
│   ├── development-journey/ # Development logs
│   ├── guides/           # Setup and user guides
│   └── ISTIKHARA_FEATURE.md  # Istikhara feature documentation
│
├── agents/               # Agent configurations
│   ├── ci-cd-agent.md
│   ├── documentation-agent.md
│   ├── frontend-agent.md
│   ├── backend-agent.md
│   ├── design-agent.md
│   ├── database-agent.md
│   ├── social-agent.md
│   ├── content-agent.md
│   └── llm-agent.md
│
├── .github/
│   └── workflows/        # GitHub Actions workflows
│
├── docker-compose.yml    # Docker services configuration
├── .gitignore
├── .env.example         # Environment variables template
└── README.md            # This file
```

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (recommended)
- Ollama (installed locally)

### Installation

#### 1. Clone the repository
```bash
git clone <repository-url>
cd "Dream Interpreter"
```

#### 2. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

#### 3. Using Docker (Recommended)
```bash
# Start all services
docker-compose up -d

# The app will be available at:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

#### 4. Manual Setup

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Database:**
```bash
# Create PostgreSQL database
createdb dream_interpreter

# Run migrations
cd backend
alembic upgrade head
```

## Development Workflow

### Agents
This project uses specialized agents for different aspects of development:

- **CI/CD Agent**: Handles automated deployments, testing, and continuous integration
- **Documentation Agent**: Maintains and updates project documentation
- **Development Journey Agent**: Tracks development progress and decisions
- **Frontend Agent**: Manages frontend development and UI/UX
- **Backend Agent**: Handles backend API development
- **Design Agent**: Creates and maintains design system and assets
- **Database Agent**: Manages database schema and migrations
- **Database Admin Agent**: Handles database optimization and maintenance
- **Social Media Agent**: Manages social features integration
- **Content Agent**: Creates and curates Islamic content
- **LLM Agent**: Fine-tunes and optimizes the dream interpretation model

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: description of your changes"

# Push to GitHub
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### Commit Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## API Documentation

Once the backend is running, visit `http://localhost:8000/docs` for interactive API documentation (Swagger UI).

## Design Philosophy

### Islamic Aesthetic
- **Color Palette**: Deep greens, golds, and whites inspired by Islamic architecture
- **Typography**: Clean, readable fonts with Arabic script support
- **Patterns**: Geometric Islamic patterns as subtle background elements
- **Icons**: Culturally appropriate iconography

### User Experience
- **Simplicity**: Clean, intuitive interface
- **Accessibility**: WCAG 2.1 Level AA compliance
- **Responsiveness**: Mobile-first design
- **Performance**: Fast load times, optimized assets

## Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Deployment

### Production Deployment
CI/CD pipeline automatically deploys to production on merge to `main` branch.

Manual deployment:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Contributing

1. Check the agents/ folder for specialized guidelines
2. Follow the code style and commit conventions
3. Write tests for new features
4. Update documentation
5. Submit pull request with detailed description

## Security

- All user data is encrypted at rest
- HTTPS only in production
- JWT authentication with refresh tokens
- Input validation and sanitization
- Rate limiting on all endpoints
- CORS properly configured

## License

[To be determined]

## Contact & Support

For questions, issues, or contributions, please open an issue on GitHub.

## Roadmap

### Phase 1 (MVP)
- [ ] User authentication and authorization
- [ ] Basic dream journal functionality
- [ ] AI dream interpretation via Ollama
- [ ] Islamic dream symbolism database
- [x] Basic UI with Islamic theme
- [x] **Istikhara Dream Interpretation** - ✅ Completed

### Phase 2
- [ ] Social features (sharing, likes, comments)
- [ ] Human Imam consultation system
- [ ] Sleep quality tracking
- [ ] Enhanced dream journal with history

### Phase 3
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Personalized dream insights
- [ ] Community features expansion

### Phase 4
- [ ] Multi-language support (Arabic, Urdu, etc.)
- [ ] Voice input for dreams
- [ ] Dream pattern recognition
- [ ] Integration with wearable devices

---

**Built with love for the Muslim community**
