# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Complete Ollama LLM integration for AI-powered dream interpretation
- Regular dream interpretation endpoint: `POST /api/v1/interpretations/interpret`
- Istikhara dream interpretation endpoint: `POST /api/v1/interpretations/interpret/istikhara`
- Ollama health check endpoint: `GET /api/v1/interpretations/health`
- Pydantic schemas for dream interpretation requests and responses
- Request/response validation for interpretation endpoints
- Islamic context prompt engineering for accurate interpretations
- Automatic Ollama health check on application startup
- Comprehensive API documentation for interpretation endpoints
- Ollama integration guide with setup instructions and examples

### Changed
- Updated main README with Ollama integration section
- Enhanced getting started guide with Ollama setup instructions

### Technical Details
- **Backend Files Added:**
  - `app/api/v1/endpoints/interpretations.py` - Interpretation API endpoints
  - `app/schemas/dream.py` - Dream journal schemas
  - `app/schemas/interpretation.py` - Interpretation request/response schemas
  - `backend/OLLAMA_INTEGRATION.md` - Comprehensive integration documentation
  - `docs/api/interpretations.md` - API endpoint documentation

- **Backend Files Modified:**
  - `app/api/v1/api.py` - Added interpretations router
  - `app/main.py` - Added Ollama health check on startup
  - `app/schemas/__init__.py` - Exported new schemas

### Notes
- Ollama service (`app/services/ollama_service.py`) was already implemented
- This release connects the Ollama service to FastAPI application through proper API endpoints
- All endpoints include error handling, logging, and proper HTTP status codes
- Interpretations include Islamic wisdom from classical scholars (Ibn Sirin, Al-Nabulsi)

---

## [0.1.0] - 2025-11-08

### Added
- Initial project setup
- Backend FastAPI application structure
- Frontend React application structure
- PostgreSQL database configuration
- Redis caching configuration
- Docker and Docker Compose setup
- Basic authentication system
- Database models and migrations
- Ollama service implementation
- Islamic dream symbolism database
- Project documentation structure
- Development agents configuration
- CI/CD pipeline setup

### Technical Stack
- **Backend:** Python 3.11+, FastAPI, SQLAlchemy 2.0, PostgreSQL 15+, Redis 7+
- **Frontend:** React 18+, Tailwind CSS 3+, Redux Toolkit
- **LLM:** Ollama (local deployment)
- **DevOps:** Docker, Docker Compose, GitHub Actions

---

## Release Notes

### Version 0.1.0 - Initial Release (2025-11-08)

This is the initial release of Dream Interpreter, establishing the foundation for an Islamic dream interpretation platform.

**Highlights:**
- Complete backend and frontend application structure
- Local LLM integration with Ollama
- Database schema for users, dreams, and interpretations
- Docker-based development environment
- Comprehensive documentation and development guides

**What's Working:**
- Backend API server with FastAPI
- Frontend React application
- Database connections (PostgreSQL + Redis)
- Ollama service integration
- Basic project structure and documentation

**What's Next:**
- User authentication implementation
- Dream journal functionality
- Social features (sharing, comments, likes)
- Imam consultation system
- Sleep tracking features

---

[Unreleased]: https://github.com/faizanxgp/dreamweavers/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/faizanxgp/dreamweavers/releases/tag/v0.1.0
