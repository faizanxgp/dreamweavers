# Istikhara API Usage Guide

Quick guide for testing and using the Istikhara Dream Interpretation API.

## Prerequisites

Ensure the following services are running:
- Backend API (http://localhost:8000)
- PostgreSQL database
- Ollama service (http://localhost:11434)

## Quick Start

### 1. Check API Health

```bash
curl http://localhost:8000/api/v1/
```

Expected response:
```json
{
  "message": "Dream Interpreter API v1"
}
```

### 2. Submit an Istikhara Dream

**Minimal Request:**
```bash
curl -X POST http://localhost:8000/api/v1/istikhara \
  -H "Content-Type: application/json" \
  -H "X-User-Id: 1" \
  -d '{
    "title": "Dream about marriage decision",
    "description": "I saw a beautiful garden with white flowers and felt peaceful",
    "istikhara_decision": "Marriage proposal from a colleague"
  }'
```

**Full Request with All Fields:**
```bash
curl -X POST http://localhost:8000/api/v1/istikhara \
  -H "Content-Type: application/json" \
  -H "X-User-Id: 1" \
  -d '{
    "title": "Dream about job opportunity",
    "description": "I was in a bright office filled with books. There was a lot of natural light coming through the windows. I felt peaceful and saw my family members smiling at me. The office had green plants everywhere.",
    "istikhara_decision": "Choosing between staying at current job or accepting new position abroad",
    "emotions": ["Peace", "Clarity", "Hope"],
    "symbols": ["Books", "Light", "Garden", "Family"],
    "colors": ["White", "Green", "Gold"],
    "dream_date": "2024-01-15",
    "time_of_day": "night",
    "privacy": "private"
  }'
```

**Expected Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "title": "Dream about job opportunity",
  "description": "I was in a bright office...",
  "dream_type": "istikhara",
  "istikhara_decision": "Choosing between staying at current job...",
  "emotions": ["Peace", "Clarity", "Hope"],
  "symbols": ["Books", "Light", "Garden", "Family"],
  "colors": ["White", "Green", "Gold"],
  "dream_date": "2024-01-15",
  "time_of_day": "night",
  "privacy": "private",
  "is_shared": false,
  "created_at": "2024-01-16T10:30:00Z",
  "updated_at": "2024-01-16T10:30:00Z",
  "interpretation": {
    "id": 1,
    "content": "In Islamic dream interpretation, seeing a bright office with books is generally considered a positive sign...",
    "spiritual_guidance": "Please consult with knowledgeable scholars for important decisions.",
    "confidence_score": 0.7,
    "created_at": "2024-01-16T10:30:00Z"
  }
}
```

### 3. Retrieve an Istikhara Dream

```bash
curl -X GET http://localhost:8000/api/v1/istikhara/1 \
  -H "X-User-Id: 1"
```

### 4. Get All Interpretations for a Dream

```bash
curl -X GET http://localhost:8000/api/v1/istikhara/1/interpretations \
  -H "X-User-Id: 1"
```

## Interactive API Documentation

Visit http://localhost:8000/docs for interactive Swagger UI where you can:
- See all available endpoints
- Try out API calls directly in the browser
- View request/response schemas
- See validation rules

## Common Use Cases

### Use Case 1: Job Decision

```bash
curl -X POST http://localhost:8000/api/v1/istikhara \
  -H "Content-Type: application/json" \
  -H "X-User-Id: 1" \
  -d '{
    "title": "New job opportunity",
    "description": "I dreamed I was walking in a bright path with clear directions",
    "istikhara_decision": "Should I accept the new job offer?",
    "emotions": ["Clarity", "Peace"],
    "colors": ["White", "Gold"]
  }'
```

### Use Case 2: Marriage Decision

```bash
curl -X POST http://localhost:8000/api/v1/istikhara \
  -H "Content-Type: application/json" \
  -H "X-User-Id: 1" \
  -d '{
    "title": "Marriage proposal dream",
    "description": "I saw a beautiful garden with blooming flowers and heard pleasant sounds",
    "istikhara_decision": "Marriage proposal - should I proceed?",
    "emotions": ["Peace", "Joy", "Hope"],
    "symbols": ["Garden", "Flowers", "Water"],
    "colors": ["Green", "White"]
  }'
```

### Use Case 3: Education Decision

```bash
curl -X POST http://localhost:8000/api/v1/istikhara \
  -H "Content-Type: application/json" \
  -H "X-User-Id: 1" \
  -d '{
    "title": "University choice",
    "description": "I was studying in a library filled with light, surrounded by helpful people",
    "istikhara_decision": "Which university should I attend?",
    "emotions": ["Clarity", "Confidence"],
    "symbols": ["Books", "Library", "Teachers"],
    "colors": ["White", "Blue"]
  }'
```

### Use Case 4: Business Decision

```bash
curl -X POST http://localhost:8000/api/v1/istikhara \
  -H "Content-Type: application/json" \
  -H "X-User-Id: 1" \
  -d '{
    "title": "Business partnership",
    "description": "I saw myself building something with others, the foundation was strong",
    "istikhara_decision": "Should I enter this business partnership?",
    "emotions": ["Confidence", "Peace"],
    "symbols": ["Building", "Foundation", "Partners"],
    "colors": ["Gold", "Green"]
  }'
```

## Testing Different Scenarios

### Test 1: Minimal Data (Should Work)
```bash
curl -X POST http://localhost:8000/api/v1/istikhara \
  -H "Content-Type: application/json" \
  -H "X-User-Id: 1" \
  -d '{
    "title": "Test",
    "description": "Short description",
    "istikhara_decision": "Test decision"
  }'
```

### Test 2: Invalid Data (Should Fail)
```bash
# Missing required field
curl -X POST http://localhost:8000/api/v1/istikhara \
  -H "Content-Type: application/json" \
  -H "X-User-Id: 1" \
  -d '{
    "title": "Test",
    "description": "Short"
  }'

# Description too short (less than 10 characters)
curl -X POST http://localhost:8000/api/v1/istikhara \
  -H "Content-Type: application/json" \
  -H "X-User-Id: 1" \
  -d '{
    "title": "Test",
    "description": "Short",
    "istikhara_decision": "Test"
  }'
```

### Test 3: Permission Check (Should Fail)
```bash
# Try to access another user's dream
curl -X GET http://localhost:8000/api/v1/istikhara/1 \
  -H "X-User-Id: 2"
```

## Response Status Codes

- `200 OK` - Successful GET request
- `201 Created` - Successfully created new dream
- `400 Bad Request` - Invalid input data
- `404 Not Found` - Dream not found or no permission
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

## Field Validation Rules

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| title | string | Yes | 1-200 characters |
| description | string | Yes | Minimum 10 characters |
| istikhara_decision | string | Yes | Minimum 5 characters |
| emotions | array[string] | No | List of emotion strings |
| symbols | array[string] | No | List of symbol strings |
| colors | array[string] | No | List of color strings |
| dream_date | string | No | Date string |
| time_of_day | string | No | Any string |
| privacy | string | No | "private", "friends", or "public" |

## Available Emotions

- Peace
- Anxiety
- Joy
- Fear
- Confusion
- Clarity
- Hope

## Available Colors

- White
- Green
- Black
- Gold
- Blue
- Red
- Yellow

## Tips for Testing

1. **Start Ollama First**: Ensure Ollama is running with a model loaded
   ```bash
   ollama serve
   ollama pull llama2
   ```

2. **Check Logs**: Monitor backend logs for detailed error messages
   ```bash
   docker-compose logs -f backend
   ```

3. **Database Check**: Verify dreams are being saved
   ```bash
   docker-compose exec postgres psql -U dream_user -d dream_interpreter
   SELECT * FROM dreams WHERE dream_type = 'istikhara';
   ```

4. **Performance Testing**: Measure interpretation time
   ```bash
   time curl -X POST http://localhost:8000/api/v1/istikhara \
     -H "Content-Type: application/json" \
     -H "X-User-Id: 1" \
     -d '{ ... }'
   ```

## Troubleshooting

### Problem: "Failed to generate interpretation"
**Solution**:
- Check if Ollama is running: `curl http://localhost:11434/api/tags`
- Verify model is loaded: `ollama list`
- Check Ollama logs for errors

### Problem: "Dream not found"
**Solution**:
- Verify the dream ID exists
- Check if user has permission to view the dream
- Ensure privacy settings allow access

### Problem: Slow response times
**Solution**:
- Use a smaller/faster Ollama model
- Increase timeout settings
- Check system resources

## Next Steps

- Read the [Full Feature Documentation](../ISTIKHARA_FEATURE.md)
- Explore the [Interactive API Docs](http://localhost:8000/docs)
- Try the [Frontend UI](http://localhost:3000/istikhara)

---

**Need Help?** Check the main documentation or open an issue on GitHub.
