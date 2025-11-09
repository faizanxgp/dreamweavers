# Istikhara Dream Interpretation Feature

## Overview

The Istikhara Dream Interpretation feature allows users to submit dreams they've seen after performing Salat al-Istikhara (the Islamic prayer for guidance) and receive AI-powered interpretations based on classical Islamic dream interpretation traditions.

## Table of Contents

- [Islamic Background](#islamic-background)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Frontend Usage](#frontend-usage)
- [Technical Implementation](#technical-implementation)
- [Data Models](#data-models)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)

## Islamic Background

### What is Istikhara?

Istikhara (استخارة) is an Islamic prayer for seeking Allah's guidance when making important decisions. The word comes from the Arabic root "khayr" (خير), meaning "goodness" or "best."

### The Istikhara Prayer

Muslims perform a two-unit prayer (rakaat) and recite a specific supplication (dua) asking Allah to guide them towards the best decision and make it easy, or to turn them away from it if it's harmful.

### Dreams After Istikhara

After performing Istikhara, some people report seeing dreams that may provide insights about their decision. However, Islamic scholars emphasize:

1. **Not all dreams are divine guidance** - Dreams can come from oneself, Shaytan, or Allah
2. **Consultation is important** - Seek advice from knowledgeable people
3. **Multiple factors** - Consider the dream alongside other signs and circumstances
4. **Scholarly consultation** - For major decisions, consult with Islamic scholars

## Features

### User Capabilities

1. **Submit Istikhara Dreams**
   - Provide dream title and detailed description
   - Specify the decision context (what the Istikhara was about)
   - Select emotions felt during the dream
   - Identify prominent colors in the dream
   - List key symbols observed
   - Record dream date and time
   - Set privacy level (private, friends, public)

2. **Receive AI Interpretation**
   - Instant interpretation using Ollama LLM
   - Specialized Istikhara-focused prompting
   - Analysis of positive and negative signs
   - Islamic guidance on how to proceed
   - Spiritual guidance and reminders

3. **View Dream History**
   - Access previously submitted Istikhara dreams
   - Review interpretations
   - Track decision-making journey

## API Documentation

### Base URL

```
http://localhost:8000/api/v1
```

### Endpoints

#### 1. Submit Istikhara Dream

**Endpoint:** `POST /istikhara`

**Description:** Submit a new Istikhara dream and receive instant AI interpretation.

**Headers:**
```
Content-Type: application/json
X-User-Id: <user_id>  # For testing; will be replaced by JWT authentication
```

**Request Body:**
```json
{
  "title": "Dream about a new job opportunity",
  "description": "I saw myself in a bright office with many books...",
  "istikhara_decision": "Choosing between two job offers - one local, one abroad",
  "emotions": ["Peace", "Clarity", "Hope"],
  "symbols": ["Books", "Light", "Garden"],
  "colors": ["White", "Green", "Gold"],
  "dream_date": "2024-01-15",
  "time_of_day": "night",
  "privacy": "private"
}
```

**Response:** `201 Created`
```json
{
  "id": 123,
  "user_id": 1,
  "title": "Dream about a new job opportunity",
  "description": "I saw myself in a bright office with many books...",
  "dream_type": "istikhara",
  "istikhara_decision": "Choosing between two job offers - one local, one abroad",
  "emotions": ["Peace", "Clarity", "Hope"],
  "symbols": ["Books", "Light", "Garden"],
  "colors": ["White", "Green", "Gold"],
  "dream_date": "2024-01-15",
  "time_of_day": "night",
  "privacy": "private",
  "is_shared": false,
  "created_at": "2024-01-16T08:30:00Z",
  "updated_at": "2024-01-16T08:30:00Z",
  "interpretation": {
    "id": 456,
    "content": "In Islamic dream interpretation, seeing books and light...",
    "spiritual_guidance": "Please consult with knowledgeable scholars for important decisions.",
    "confidence_score": 0.7,
    "created_at": "2024-01-16T08:30:00Z"
  }
}
```

#### 2. Get Istikhara Dream

**Endpoint:** `GET /istikhara/{dream_id}`

**Description:** Retrieve a specific Istikhara dream with its interpretation.

**Headers:**
```
X-User-Id: <user_id>
```

**Response:** `200 OK`
```json
{
  "id": 123,
  "user_id": 1,
  "title": "Dream about a new job opportunity",
  // ... (same structure as POST response)
}
```

**Error Responses:**
- `404 Not Found` - Dream not found or no permission to view
- `400 Bad Request` - Dream is not an Istikhara type

#### 3. Get All Interpretations

**Endpoint:** `GET /istikhara/{dream_id}/interpretations`

**Description:** Get all interpretations for a specific Istikhara dream (useful if multiple interpretations exist).

**Headers:**
```
X-User-Id: <user_id>
```

**Response:** `200 OK`
```json
[
  {
    "id": 456,
    "dream_id": 123,
    "interpretation_type": "ai",
    "interpretation_text": "In Islamic dream interpretation...",
    "spiritual_guidance": "Please consult with knowledgeable scholars...",
    "quranic_references": null,
    "hadith_references": null,
    "confidence_score": 0.7,
    "model_name": "llama2",
    "created_at": "2024-01-16T08:30:00Z"
  }
]
```

## Frontend Usage

### Accessing the Feature

Navigate to `/istikhara` in the application to access the Istikhara dream submission page.

### User Flow

1. **Navigate to Istikhara Page**
   - Click "Istikhara Dreams" in the navigation menu
   - Or visit `/istikhara` directly

2. **Fill Out the Form**
   - Enter a brief title for your dream
   - Describe what decision you made Istikhara for
   - Provide detailed dream description (minimum 10 characters)
   - Optionally select:
     - Dream date
     - Time of day (Morning, Afternoon, Evening, Night, Dawn)
     - Emotions felt (Peace, Anxiety, Joy, Fear, Confusion, Clarity, Hope)
     - Prominent colors (White, Green, Black, Gold, Blue, Red, Yellow)
     - Key symbols (comma-separated)
   - Choose privacy setting

3. **Submit and View Interpretation**
   - Click "Submit for Interpretation"
   - Wait for AI processing (typically 10-30 seconds)
   - View comprehensive interpretation with:
     - Dream details recap
     - AI-generated interpretation
     - Spiritual guidance
     - Important reminders about Istikhara

4. **Actions Available**
   - Submit another dream
   - Print the interpretation
   - Save for later reference

## Technical Implementation

### Backend Architecture

#### Technology Stack
- **Framework:** FastAPI (Python 3.11+)
- **Database:** PostgreSQL with async SQLAlchemy 2.0
- **AI/LLM:** Ollama (local deployment)
- **Validation:** Pydantic v2

#### Key Components

##### 1. API Endpoints (`backend/app/api/v1/endpoints/istikhara.py`)
- Handles HTTP requests for Istikhara dreams
- Validates input using Pydantic schemas
- Coordinates between services
- Returns formatted responses

##### 2. Dream Service (`backend/app/services/dream_service.py`)
- `create_istikhara_dream()` - Creates dream and triggers interpretation
- `get_dream_by_id()` - Retrieves dream with permission checks
- `get_dream_interpretations()` - Fetches all interpretations for a dream

##### 3. Ollama Service (`backend/app/services/ollama_service.py`)
- `interpret_istikhara()` - Specialized method for Istikhara dreams
- Custom prompt engineering for Islamic context
- Lower temperature (0.6) for more focused responses

##### 4. Schemas (`backend/app/schemas/`)
- `IstikharaDreamCreate` - Input validation
- `IstikharaDreamResponse` - Output formatting
- `InterpretationResponse` - Interpretation data structure

##### 5. Database Session (`backend/app/core/database.py`)
- Async session management
- Connection pooling
- Transaction handling

### Frontend Architecture

#### Technology Stack
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Query (TanStack Query)
- **Routing:** React Router v6

#### Key Components

##### 1. IstkharaPage (`frontend/src/pages/IstkharaPage.tsx`)
- Main page container
- Manages state between form and interpretation views
- Handles API calls using React Query
- Error handling and loading states

##### 2. IstikharaForm (`frontend/src/components/Istikhara/IstikharaForm.tsx`)
- Comprehensive form with all input fields
- Multi-select for emotions and colors
- Input validation
- Responsive design

##### 3. IstikharaInterpretation (`frontend/src/components/Istikhara/IstikharaInterpretation.tsx`)
- Beautiful display of interpretation results
- Dream metadata visualization
- Important reminders section
- Print functionality

### AI Integration

#### Prompt Engineering

The Istikhara interpretation uses a specialized prompt:

```python
def _build_istikhara_prompt(self, dream_text: str, decision_context: str) -> str:
    return f"""You are an Islamic dream interpretation expert specializing in Istikhara (seeking guidance) dreams.

The person performed Istikhara prayer regarding: {decision_context}

They saw the following dream after the Istikhara:
{dream_text}

Please provide a thoughtful interpretation specifically for this Istikhara dream:
1. What the dream might indicate about the decision
2. Positive and negative signs in the dream
3. Islamic guidance on how to proceed
4. Important reminder that the interpretation should be considered alongside other factors and consultation with knowledgeable people

Remember: Not all dreams after Istikhara are direct divine guidance. Some dreams are from oneself or other sources. Provide balanced, wise counsel."""
```

#### Model Configuration
- **Temperature:** 0.6 (more focused than regular dreams at 0.7)
- **Top-p:** 0.85
- **Model:** Configurable (default: llama2)
- **Timeout:** 120 seconds

## Data Models

### Dream Model

```python
class Dream(BaseModel):
    id: int
    user_id: int
    title: str                    # Brief title
    description: str              # Detailed dream description
    dream_type: DreamType         # ISTIKHARA for this feature
    istikhara_decision: str       # What decision was made
    emotions: List[str]           # Emotions felt
    symbols: List[str]            # Key symbols
    colors: List[str]             # Prominent colors
    people: List[str]             # People in dream
    dream_date: str               # When dream occurred
    time_of_day: str              # Time period
    privacy: DreamPrivacy         # Privacy level
    is_shared: bool               # Shared to community
    tags: List[str]               # User tags
    created_at: datetime
    updated_at: datetime
```

### Interpretation Model

```python
class Interpretation(BaseModel):
    id: int
    dream_id: int
    user_id: int
    interpretation_type: InterpretationType  # AI, IMAM, COMMUNITY
    interpretation_text: str
    model_name: str                          # LLM model used
    confidence_score: float                  # 0.0 to 1.0
    spiritual_guidance: str
    quranic_references: str
    hadith_references: str
    created_at: datetime
```

## Testing

### Manual Testing

#### Test Case 1: Basic Submission
```bash
curl -X POST http://localhost:8000/api/v1/istikhara \
  -H "Content-Type: application/json" \
  -H "X-User-Id: 1" \
  -d '{
    "title": "Test Dream",
    "description": "I saw a bright light and felt peace",
    "istikhara_decision": "Job change decision"
  }'
```

#### Test Case 2: Full Metadata
```bash
curl -X POST http://localhost:8000/api/v1/istikhara \
  -H "Content-Type: application/json" \
  -H "X-User-Id: 1" \
  -d '{
    "title": "Marriage Decision Dream",
    "description": "Detailed dream description here...",
    "istikhara_decision": "Marriage proposal consideration",
    "emotions": ["Peace", "Clarity"],
    "colors": ["White", "Green"],
    "symbols": ["Water", "Garden"],
    "dream_date": "2024-01-15",
    "time_of_day": "night",
    "privacy": "private"
  }'
```

#### Test Case 3: Retrieve Dream
```bash
curl -X GET http://localhost:8000/api/v1/istikhara/1 \
  -H "X-User-Id: 1"
```

### Frontend Testing

1. **Navigate to `/istikhara`** - Verify page loads
2. **Submit form without required fields** - Verify validation
3. **Submit complete form** - Verify interpretation appears
4. **Test loading state** - Verify spinner shows during processing
5. **Test error handling** - Disconnect from backend, verify error message
6. **Test responsive design** - Check mobile, tablet, desktop views

## Security Considerations

### Current Implementation
- Simple header-based user ID for testing
- Privacy settings enforced at database level
- Input validation using Pydantic

### Production Requirements
1. **Authentication**
   - Replace X-User-Id header with JWT token validation
   - Implement refresh token mechanism
   - Add rate limiting per user

2. **Authorization**
   - Verify user owns dream before modifications
   - Implement privacy controls
   - Add sharing permissions

3. **Data Protection**
   - Encrypt sensitive dream content
   - Implement data retention policies
   - Add GDPR compliance features

4. **API Security**
   - Add CORS configuration
   - Implement rate limiting
   - Add request size limits
   - Enable HTTPS only

## Future Enhancements

### Short Term
1. **Rich Text Editor** - Allow formatted dream descriptions
2. **Voice Recording** - Record dreams verbally
3. **Image Upload** - Upload dream sketches or relevant images
4. **Notification System** - Alert when interpretation is ready
5. **Dream Journal** - View all Istikhara dreams in timeline

### Medium Term
1. **Imam Consultation** - Request human scholar review
2. **Community Feedback** - Allow trusted community members to comment
3. **Dream Analysis Trends** - Track patterns in Istikhara dreams
4. **Multiple Interpretations** - Get interpretations from different models
5. **PDF Export** - Download dreams and interpretations

### Long Term
1. **Mobile Apps** - Native iOS and Android applications
2. **Advanced AI Models** - Fine-tuned models on Islamic texts
3. **Multilingual Support** - Arabic, Urdu, Turkish, etc.
4. **Dream Matching** - Find similar Istikhara dreams
5. **Scholarly Review System** - Verified scholars can provide interpretations

## Troubleshooting

### Common Issues

#### Issue: "Failed to submit dream"
**Cause:** Backend not running or Ollama service unavailable
**Solution:**
1. Verify backend is running: `docker-compose up backend`
2. Check Ollama service: `curl http://localhost:11434/api/tags`
3. Review backend logs for errors

#### Issue: "Interpretation taking too long"
**Cause:** Ollama processing time
**Solution:**
1. Check Ollama is running and has the model loaded
2. Increase timeout in settings if needed
3. Consider using a lighter model for faster responses

#### Issue: "Dream not found"
**Cause:** Permission issues or incorrect dream ID
**Solution:**
1. Verify user owns the dream
2. Check dream ID is correct
3. Ensure privacy settings allow access

## Contributing

To contribute to the Istikhara feature:

1. **Backend Changes**
   - Follow FastAPI best practices
   - Add proper type hints
   - Include docstrings
   - Write unit tests

2. **Frontend Changes**
   - Use TypeScript strictly
   - Follow React hooks patterns
   - Ensure accessibility
   - Test responsive design

3. **Documentation**
   - Update API documentation
   - Add code comments
   - Update this README

## References

### Islamic Sources
- Classical works of Ibn Sirin
- Dream interpretation by Imam Al-Nabulsi
- Authentic Hadith on dreams

### Technical Documentation
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Ollama API Documentation](https://github.com/ollama/ollama/blob/main/docs/api.md)

## License

This feature is part of the Dream Interpreter platform and follows the same license as the parent project.

---

**Last Updated:** January 2024
**Maintained By:** Development Team
**Questions?** Open an issue on GitHub
