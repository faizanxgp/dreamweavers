# Ollama Integration - Dream Interpretation API

## Overview

The Ollama service integration is now complete and connected to the API endpoints. The system can now make actual LLM calls to interpret dreams using a local Ollama instance.

## What's Been Implemented

### 1. **Ollama Service** (`app/services/ollama_service.py`)
   - HTTP client for communicating with Ollama API
   - `interpret_dream()` - Regular dream interpretation
   - `interpret_istikhara()` - Specialized Istikhara dream interpretation
   - `check_health()` - Health check for Ollama service
   - Prompt engineering for Islamic dream interpretation context

### 2. **API Schemas** (`app/schemas/`)
   - `InterpretationRequest` - Request schema for dream interpretation
   - `IstikharaInterpretationRequest` - Request schema for Istikhara dreams
   - `InterpretationResponse` - Response schema with interpretation results
   - `DreamCreate` & `DreamResponse` - Schemas for dream journal entries

### 3. **API Endpoints** (`app/api/v1/endpoints/interpretations.py`)
   - `POST /api/v1/interpretations/interpret` - Regular dream interpretation
   - `POST /api/v1/interpretations/interpret/istikhara` - Istikhara dream interpretation
   - `GET /api/v1/interpretations/health` - Check Ollama service health

### 4. **Startup Integration** (`app/main.py`)
   - Automatic Ollama health check on application startup
   - Logging of Ollama connection status
   - Graceful handling if Ollama is not running

## API Endpoints

### Regular Dream Interpretation

```bash
POST /api/v1/interpretations/interpret
Content-Type: application/json

{
  "dream_text": "I saw myself flying over green fields with a bright light guiding me",
  "emotions": ["peaceful", "hopeful"],
  "symbols": ["flying", "green fields", "light"],
  "time_of_day": "before_fajr"
}
```

**Response:**
```json
{
  "success": true,
  "interpretation": "This dream shows positive signs...",
  "model": "llama2",
  "confidence": 0.8,
  "interpretation_type": "regular"
}
```

### Istikhara Dream Interpretation

```bash
POST /api/v1/interpretations/interpret/istikhara
Content-Type: application/json

{
  "dream_text": "I saw clear water flowing in a garden with beautiful flowers",
  "decision_context": "Whether to accept a new job offer"
}
```

**Response:**
```json
{
  "success": true,
  "interpretation": "The dream indicates positive signs regarding your decision...",
  "model": "llama2",
  "type": "istikhara"
}
```

### Health Check

```bash
GET /api/v1/interpretations/health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "ollama",
  "model": "llama2",
  "host": "http://localhost:11434"
}
```

## Configuration

Configure Ollama in `.env` file:

```env
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama2
OLLAMA_TIMEOUT=120
```

## Running the Application

1. **Start Ollama** (if not already running):
   ```bash
   ollama serve
   ```

2. **Pull a model** (if you haven't already):
   ```bash
   ollama pull llama2
   # or for better results:
   ollama pull llama2:13b
   # or
   ollama pull mistral
   ```

3. **Install Python dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Run the FastAPI application**:
   ```bash
   uvicorn app.main:app --reload
   ```

5. **Access the API documentation**:
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## Testing the Integration

### Using curl:

```bash
# Test regular interpretation
curl -X POST "http://localhost:8000/api/v1/interpretations/interpret" \
  -H "Content-Type: application/json" \
  -d '{
    "dream_text": "I saw a green bird flying towards the sun",
    "emotions": ["peaceful"],
    "symbols": ["bird", "sun"]
  }'

# Test Istikhara interpretation
curl -X POST "http://localhost:8000/api/v1/interpretations/interpret/istikhara" \
  -H "Content-Type: application/json" \
  -d '{
    "dream_text": "I saw clear water and beautiful flowers",
    "decision_context": "Starting a new business"
  }'

# Check health
curl "http://localhost:8000/api/v1/interpretations/health"
```

### Using Python:

```python
import httpx

async def test_interpretation():
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8000/api/v1/interpretations/interpret",
            json={
                "dream_text": "I saw myself flying over green fields",
                "emotions": ["peaceful", "hopeful"],
                "symbols": ["flying", "green fields"]
            }
        )
        print(response.json())
```

## Features

### Prompt Engineering
The service includes specialized prompts for:
- Islamic dream interpretation context
- References to classical scholars (Ibn Sirin, Al-Nabulsi)
- Quranic and Hadith references where applicable
- Balanced and hopeful interpretations
- Istikhara-specific guidance

### Error Handling
- Graceful degradation if Ollama is not running
- Timeout handling (default: 120 seconds)
- Detailed error messages in responses
- Logging for debugging

### Extensibility
The system is designed to easily:
- Add more interpretation types
- Switch between different LLM models
- Add streaming responses
- Integrate with database for saving interpretations
- Add user authentication

## Next Steps

To complete the full integration:
1. Add authentication to endpoints
2. Save interpretations to database
3. Implement interpretation history
4. Add rate limiting
5. Create frontend UI components
6. Add tests for the endpoints
7. Set up proper logging and monitoring

## Troubleshooting

**Ollama not responding:**
- Ensure Ollama is running: `ollama serve`
- Check the correct port: default is 11434
- Verify model is downloaded: `ollama list`

**Slow responses:**
- LLM inference can take 30-60 seconds depending on model size
- Consider using a smaller model for faster responses
- Adjust OLLAMA_TIMEOUT if needed

**Quality of interpretations:**
- Larger models (13B, 70B) provide better results
- Fine-tuning on Islamic texts would improve accuracy
- Consider using specialized models for better results
