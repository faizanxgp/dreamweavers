# API Documentation

## Overview

Dream Interpreter REST API provides endpoints for Islamic dream interpretation, user management, dream journaling, and social features.

## Base URL

```
Development: http://localhost:8000/api/v1
Production: https://api.dreaminterpreter.com/api/v1
```

## Interactive Documentation

The API includes interactive documentation powered by OpenAPI (Swagger):

- **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Available Endpoints

### Dream Interpretation

AI-powered dream interpretation using Ollama LLM.

- [Interpretation Endpoints](./interpretations.md) - Complete documentation for all interpretation endpoints

**Quick Links:**
- Regular Dream Interpretation: `POST /api/v1/interpretations/interpret`
- Istikhara Dream Interpretation: `POST /api/v1/interpretations/interpret/istikhara`
- Health Check: `GET /api/v1/interpretations/health`

### Authentication (Coming Soon)

User authentication and authorization endpoints.

- Register: `POST /api/v1/auth/register`
- Login: `POST /api/v1/auth/login`
- Refresh Token: `POST /api/v1/auth/refresh`
- Logout: `POST /api/v1/auth/logout`

### Dreams (Coming Soon)

Dream journal management endpoints.

- Create Dream: `POST /api/v1/dreams`
- Get User Dreams: `GET /api/v1/dreams`
- Get Dream by ID: `GET /api/v1/dreams/{id}`
- Update Dream: `PUT /api/v1/dreams/{id}`
- Delete Dream: `DELETE /api/v1/dreams/{id}`

### Users (Coming Soon)

User profile management endpoints.

- Get Profile: `GET /api/v1/users/me`
- Update Profile: `PUT /api/v1/users/me`
- Get User Stats: `GET /api/v1/users/me/stats`

### Social (Coming Soon)

Social interaction endpoints for community features.

- Share Dream: `POST /api/v1/social/dreams/{id}/share`
- Like Dream: `POST /api/v1/social/dreams/{id}/like`
- Comment on Dream: `POST /api/v1/social/dreams/{id}/comments`
- Get Feed: `GET /api/v1/social/feed`

## Authentication

Most endpoints will require JWT authentication (coming soon).

**Header Format:**
```
Authorization: Bearer <your_jwt_token>
```

**Getting a Token:**
```bash
# Register
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "secure_password",
    "full_name": "John Doe"
  }'

# Login
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "secure_password"
  }'
```

## Request/Response Format

### Request Headers

All requests should include:
```
Content-Type: application/json
Accept: application/json
```

For authenticated endpoints:
```
Authorization: Bearer <token>
```

### Response Format

Successful responses:
```json
{
  "success": true,
  "data": { /* response data */ }
}
```

Error responses:
```json
{
  "detail": "Error message"
}
```

### HTTP Status Codes

The API uses standard HTTP status codes:

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation error
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error
- `503 Service Unavailable` - Service temporarily unavailable

## Rate Limiting

Rate limiting will be implemented in a future update:

- **Anonymous:** 10 requests per minute
- **Authenticated:** 100 requests per minute
- **Premium:** 1000 requests per minute

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1699564800
```

## Pagination

List endpoints support pagination:

**Query Parameters:**
- `skip` (integer): Number of items to skip (default: 0)
- `limit` (integer): Number of items to return (default: 20, max: 100)

**Example:**
```bash
GET /api/v1/dreams?skip=0&limit=20
```

**Response:**
```json
{
  "items": [ /* array of items */ ],
  "total": 150,
  "skip": 0,
  "limit": 20
}
```

## Filtering and Sorting

List endpoints support filtering and sorting:

**Query Parameters:**
- `sort` (string): Field to sort by (e.g., `created_at`, `-created_at` for descending)
- `filter` (string): Filter criteria (endpoint-specific)

**Example:**
```bash
GET /api/v1/dreams?sort=-created_at&filter=istikhara
```

## Versioning

The API uses URL-based versioning:
```
/api/v1/...  # Current version
/api/v2/...  # Future version
```

## CORS

CORS is enabled for the following origins in development:
- `http://localhost:3000`
- `http://localhost:3001`

In production, CORS is configured for your frontend domain.

## WebSockets (Future)

Real-time features will use WebSockets:

```javascript
const ws = new WebSocket('ws://localhost:8000/ws');
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};
```

## Testing the API

### Using curl

```bash
# Health check
curl "http://localhost:8000/api/v1/interpretations/health"

# Interpret a dream
curl -X POST "http://localhost:8000/api/v1/interpretations/interpret" \
  -H "Content-Type: application/json" \
  -d '{
    "dream_text": "I saw a green bird flying towards the sun"
  }'
```

### Using HTTPie

```bash
# Install HTTPie
pip install httpie

# Make requests
http GET http://localhost:8000/api/v1/interpretations/health

http POST http://localhost:8000/api/v1/interpretations/interpret \
  dream_text="I saw a green bird flying towards the sun"
```

### Using Postman

1. Import the OpenAPI spec: `http://localhost:8000/openapi.json`
2. Set base URL to `http://localhost:8000`
3. Add environment variables for tokens
4. Start making requests!

### Using Python

```python
import httpx
import asyncio

async def test_interpretation():
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8000/api/v1/interpretations/interpret",
            json={
                "dream_text": "I saw myself flying over green fields",
                "emotions": ["peaceful"],
                "symbols": ["flying", "green fields"]
            }
        )
        print(response.json())

asyncio.run(test_interpretation())
```

### Using JavaScript

```javascript
// Using fetch
const response = await fetch('http://localhost:8000/api/v1/interpretations/interpret', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    dream_text: 'I saw a green bird flying towards the sun',
    emotions: ['peaceful'],
    symbols: ['bird', 'sun']
  })
});

const data = await response.json();
console.log(data);
```

## Error Handling

Always check for errors in your client code:

```python
try:
    response = await client.post(url, json=data)
    response.raise_for_status()
    result = response.json()
except httpx.HTTPStatusError as e:
    print(f"HTTP error: {e.response.status_code}")
    print(f"Details: {e.response.json()}")
except httpx.RequestError as e:
    print(f"Request error: {e}")
```

## Best Practices

1. **Use HTTPS in production** - Always use encrypted connections
2. **Handle rate limits** - Implement exponential backoff
3. **Validate input** - Check data before sending requests
4. **Handle errors gracefully** - Don't expose error details to users
5. **Cache responses** - Reduce unnecessary API calls
6. **Use compression** - Enable gzip compression for large responses
7. **Monitor usage** - Track API usage and errors
8. **Version your clients** - Keep client libraries up to date

## SDK/Client Libraries

Official client libraries (coming soon):
- Python SDK
- JavaScript/TypeScript SDK
- React Hooks Library

## Support

- **Documentation Issues:** Open an issue on GitHub
- **API Questions:** Check the interactive docs at `/docs`
- **Bug Reports:** Include request/response details and error messages

## Related Documentation

- [Interpretation Endpoints](./interpretations.md)
- [Ollama Integration Guide](../../backend/OLLAMA_INTEGRATION.md)
- [Getting Started Guide](../guides/getting-started.md)
- [System Architecture](../architecture/system-overview.md)

---

**Last Updated:** 2025-11-09
