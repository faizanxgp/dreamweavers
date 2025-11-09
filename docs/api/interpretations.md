# Dream Interpretation API Endpoints

## Overview

The Dream Interpretation API provides AI-powered dream interpretation using a local Ollama LLM instance. The API offers both regular dream interpretation and specialized Istikhara (Islamic prayer for guidance) dream interpretation.

## Base URL

```
http://localhost:8000/api/v1/interpretations
```

## Authentication

Currently, these endpoints are **public** (no authentication required). Authentication will be added in a future update.

---

## Endpoints

### 1. Regular Dream Interpretation

Interprets dreams using Islamic wisdom and LLM-powered analysis.

**Endpoint:** `POST /api/v1/interpretations/interpret`

**Request Body:**

```json
{
  "dream_text": "string (required)",
  "emotions": ["string"] (optional),
  "symbols": ["string"] (optional),
  "time_of_day": "string (optional)"
}
```

**Fields:**
- `dream_text` (string, required): The dream description to interpret
- `emotions` (array of strings, optional): Emotions experienced during the dream (e.g., "peaceful", "anxious", "hopeful")
- `symbols` (array of strings, optional): Key symbols noticed in the dream (e.g., "water", "light", "bird")
- `time_of_day` (string, optional): When the dream occurred (e.g., "before_fajr", "afternoon", "night")

**Response:**

```json
{
  "success": true,
  "interpretation": "string",
  "model": "string",
  "confidence": 0.8,
  "interpretation_type": "regular"
}
```

**Response Fields:**
- `success` (boolean): Whether interpretation was successful
- `interpretation` (string): The dream interpretation text
- `model` (string): The LLM model used (e.g., "llama2")
- `confidence` (number): Confidence score (0.0 to 1.0)
- `interpretation_type` (string): Type of interpretation ("regular")

**Example Request:**

```bash
curl -X POST "http://localhost:8000/api/v1/interpretations/interpret" \
  -H "Content-Type: application/json" \
  -d '{
    "dream_text": "I saw myself flying over green fields with a bright light guiding me",
    "emotions": ["peaceful", "hopeful"],
    "symbols": ["flying", "green fields", "light"],
    "time_of_day": "before_fajr"
  }'
```

**Example Response:**

```json
{
  "success": true,
  "interpretation": "Flying in dreams often symbolizes spiritual elevation and freedom. The green fields represent growth, prosperity, and blessings in Islam. The bright light guiding you is a very positive symbol, often representing divine guidance (hidayah). Dreaming before Fajr is considered particularly significant in Islamic tradition, as dreams at this time are believed to be more truthful. This dream suggests you are on a path of spiritual growth with divine support.",
  "model": "llama2",
  "confidence": 0.85,
  "interpretation_type": "regular"
}
```

**Status Codes:**
- `200 OK`: Interpretation successful
- `400 Bad Request`: Invalid request body
- `500 Internal Server Error`: Ollama service error
- `503 Service Unavailable`: Ollama service not running

---

### 2. Istikhara Dream Interpretation

Specialized interpretation for dreams following Istikhara prayer (Islamic prayer for guidance when making decisions).

**Endpoint:** `POST /api/v1/interpretations/interpret/istikhara`

**Request Body:**

```json
{
  "dream_text": "string (required)",
  "decision_context": "string (required)",
  "emotions": ["string"] (optional)
}
```

**Fields:**
- `dream_text` (string, required): The dream description
- `decision_context` (string, required): The decision you're seeking guidance about
- `emotions` (array of strings, optional): Emotions experienced during the dream

**Response:**

```json
{
  "success": true,
  "interpretation": "string",
  "guidance": "positive|negative|unclear",
  "model": "string",
  "type": "istikhara"
}
```

**Response Fields:**
- `success` (boolean): Whether interpretation was successful
- `interpretation` (string): The dream interpretation text
- `guidance` (string): Guidance indication ("positive", "negative", or "unclear")
- `model` (string): The LLM model used
- `type` (string): Interpretation type ("istikhara")

**Example Request:**

```bash
curl -X POST "http://localhost:8000/api/v1/interpretations/interpret/istikhara" \
  -H "Content-Type: application/json" \
  -d '{
    "dream_text": "I saw clear water flowing in a garden with beautiful flowers",
    "decision_context": "Whether to accept a new job offer",
    "emotions": ["peaceful", "content"]
  }'
```

**Example Response:**

```json
{
  "success": true,
  "interpretation": "Clear, flowing water in Islamic dream interpretation is a highly positive sign, often representing purity, sustenance, and blessings. The garden with beautiful flowers symbolizes a pleasant and fruitful path. In the context of your Istikhara regarding the job offer, these symbols suggest positive indications. However, remember that Istikhara is not solely about dreams - also observe your feelings and how circumstances unfold. May Allah guide you to what is best.",
  "guidance": "positive",
  "model": "llama2",
  "type": "istikhara"
}
```

**Status Codes:**
- `200 OK`: Interpretation successful
- `400 Bad Request`: Invalid request body
- `500 Internal Server Error`: Ollama service error
- `503 Service Unavailable`: Ollama service not running

---

### 3. Health Check

Check if the Ollama service is running and accessible.

**Endpoint:** `GET /api/v1/interpretations/health`

**Response:**

```json
{
  "status": "healthy",
  "service": "ollama",
  "model": "string",
  "host": "string"
}
```

**Response Fields:**
- `status` (string): Service status ("healthy" or "unhealthy")
- `service` (string): Service name ("ollama")
- `model` (string): Current model being used
- `host` (string): Ollama host URL

**Example Request:**

```bash
curl "http://localhost:8000/api/v1/interpretations/health"
```

**Example Response:**

```json
{
  "status": "healthy",
  "service": "ollama",
  "model": "llama2",
  "host": "http://localhost:11434"
}
```

**Status Codes:**
- `200 OK`: Service is healthy
- `503 Service Unavailable`: Ollama service not running

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "detail": "Error message describing what went wrong"
}
```

### Common Errors

**Ollama Not Running:**
```json
{
  "detail": "Ollama service is not available. Please ensure Ollama is running."
}
```

**Invalid Request:**
```json
{
  "detail": "Field 'dream_text' is required"
}
```

**Timeout Error:**
```json
{
  "detail": "Request timeout. The interpretation is taking too long."
}
```

---

## Configuration

The interpretation service can be configured via environment variables:

```env
OLLAMA_HOST=http://localhost:11434  # Ollama API endpoint
OLLAMA_MODEL=llama2                 # Model to use for interpretations
OLLAMA_TIMEOUT=120                  # Request timeout in seconds
```

---

## Models

### Recommended Models

1. **llama2** (Default)
   - Good balance of speed and quality
   - Suitable for most use cases

2. **llama2:13b**
   - Better quality interpretations
   - Slower response time

3. **mistral**
   - Fast responses
   - Good for quick interpretations

4. **llama2:70b**
   - Best quality
   - Requires significant resources
   - Slow response time

### Installing Models

```bash
# Install default model
ollama pull llama2

# Install larger model for better results
ollama pull llama2:13b

# Install alternative model
ollama pull mistral
```

---

## Rate Limiting

Currently, there is **no rate limiting** on these endpoints. Rate limiting will be added in a future update to prevent abuse.

---

## Best Practices

1. **Be Descriptive**: Provide detailed dream descriptions for better interpretations
2. **Include Context**: Add emotions, symbols, and timing when available
3. **Multiple Requests**: For Istikhara, you may interpret the same dream with different models for comparison
4. **Timeout Handling**: Larger models may take 30-60 seconds; adjust client timeouts accordingly
5. **Error Handling**: Always check the `success` field in responses
6. **Spiritual Guidance**: Remember that AI interpretations are supplementary to traditional Islamic scholarship

---

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Save interpretations to database
- [ ] Interpretation history and tracking
- [ ] Rate limiting per user
- [ ] Streaming responses for real-time interpretation
- [ ] Multi-language support (Arabic, Urdu, etc.)
- [ ] Custom model fine-tuning on Islamic texts
- [ ] Interpretation feedback and ratings

---

## Related Documentation

- [Ollama Integration Guide](../../backend/OLLAMA_INTEGRATION.md)
- [Getting Started Guide](../guides/getting-started.md)
- [System Architecture](../architecture/system-overview.md)

---

## Support

For issues or questions:
- Check [Troubleshooting](../../backend/OLLAMA_INTEGRATION.md#troubleshooting)
- Open an issue on GitHub
- Consult the [API Documentation](http://localhost:8000/docs) (Swagger UI)
