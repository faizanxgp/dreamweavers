# API Reference - Azkar & Sleep Guidance

## Base Information

**Base URL:** `http://localhost:8000/api/v1`

**API Version:** v1

**Content Type:** `application/json`

---

## Azkar Endpoints

### List All Azkar

Retrieve a paginated list of Azkar with optional category filtering.

```http
GET /azkar
```

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `category` | string | No | - | Filter by category (night, sleep, morning, evening) |
| `skip` | integer | No | 0 | Number of records to skip for pagination |
| `limit` | integer | No | 100 | Maximum number of records (max: 200) |

#### Response

**Status Code:** `200 OK`

```json
{
  "total": 10,
  "azkar": [
    {
      "id": 1,
      "arabic_text": "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      "transliteration": "A'ūdhu bi-kalimāti llāhi at-tāmmāti min sharri mā khalaq",
      "translation": "I seek refuge in the perfect words of Allah from the evil of what He has created",
      "category": "night",
      "reference": "Muslim 2708",
      "display_order": 1,
      "created_at": "2024-01-01T00:00:00",
      "updated_at": "2024-01-01T00:00:00"
    }
  ]
}
```

#### Example Request

```bash
curl http://localhost:8000/api/v1/azkar?category=sleep&limit=5
```

---

### Get Night Azkar

Get all Azkar in the "night" category.

```http
GET /azkar/night
```

#### Response

**Status Code:** `200 OK`

```json
{
  "total": 2,
  "azkar": [...]
}
```

---

### Get Sleep Duas

Get all Azkar in the "sleep" category.

```http
GET /azkar/sleep
```

#### Response

**Status Code:** `200 OK`

```json
{
  "total": 7,
  "azkar": [...]
}
```

---

### Get Morning Azkar

Get all Azkar in the "morning" category.

```http
GET /azkar/morning
```

---

### Get Evening Azkar

Get all Azkar in the "evening" category.

```http
GET /azkar/evening
```

---

### Get Specific Azkar

Retrieve a single Azkar by its ID.

```http
GET /azkar/{azkar_id}
```

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `azkar_id` | integer | Yes | The ID of the Azkar |

#### Response

**Status Code:** `200 OK`

```json
{
  "id": 1,
  "arabic_text": "...",
  "transliteration": "...",
  "translation": "...",
  "category": "sleep",
  "reference": "Bukhari 6312",
  "display_order": 1,
  "created_at": "2024-01-01T00:00:00",
  "updated_at": "2024-01-01T00:00:00"
}
```

**Status Code:** `404 Not Found`

```json
{
  "detail": "Azkar not found"
}
```

---

### Create Azkar (Admin)

Create a new Azkar entry.

```http
POST /azkar
```

#### Request Body

```json
{
  "arabic_text": "string (required)",
  "transliteration": "string (optional)",
  "translation": "string (required)",
  "category": "night | sleep | morning | evening",
  "reference": "string (optional)",
  "display_order": 0
}
```

#### Response

**Status Code:** `201 Created`

```json
{
  "id": 11,
  "arabic_text": "...",
  "transliteration": "...",
  "translation": "...",
  "category": "sleep",
  "reference": "...",
  "display_order": 10,
  "created_at": "2024-01-01T12:00:00",
  "updated_at": "2024-01-01T12:00:00"
}
```

---

### Update Azkar (Admin)

Update an existing Azkar entry.

```http
PUT /azkar/{azkar_id}
```

#### Request Body

All fields are optional. Only provided fields will be updated.

```json
{
  "arabic_text": "string",
  "transliteration": "string",
  "translation": "string",
  "category": "string",
  "reference": "string",
  "display_order": 0
}
```

#### Response

**Status Code:** `200 OK`

```json
{
  "id": 1,
  ...updated fields...
}
```

---

### Delete Azkar (Admin)

Delete an Azkar entry.

```http
DELETE /azkar/{azkar_id}
```

#### Response

**Status Code:** `204 No Content`

---

## Sleep Guidance Endpoints

### Get Sleep Guidance

Get comprehensive Islamic sleep guidance and recommendations.

```http
GET /sleep/guidance
```

#### Response

**Status Code:** `200 OK`

```json
{
  "recommendation": "Follow the Sunnah of the Prophet Muhammad (peace be upon him) for better sleep. Sleep early after Isha prayer and wake up for Fajr. Maintain consistency in your sleep schedule.",
  "suggested_bedtime": "Within 2-3 hours after Isha prayer",
  "azkar_suggestions": [
    "Recite Ayat al-Kursi before sleeping",
    "Recite the last three Surahs (Al-Ikhlas, Al-Falaq, An-Nas) three times each",
    "Make Dua: 'Bismika Allahumma amutu wa ahya'",
    "Sleep on your right side, as per the Sunnah",
    "Perform wudu (ablution) before going to bed"
  ],
  "tips": [
    "Avoid heavy meals 2-3 hours before bed",
    "Ensure your room is dark and quiet",
    "Keep a consistent sleep schedule",
    "Avoid screens 30 minutes before sleep",
    "Make intention to wake up for Tahajjud or Fajr prayer",
    "Reflect on your day and seek forgiveness before sleeping"
  ]
}
```

---

### Get Islamic Sleep Times

Get recommended sleep and wake times based on Islamic tradition.

```http
GET /sleep/islamic-times
```

#### Response

**Status Code:** `200 OK`

```json
{
  "recommended_bedtime": {
    "description": "Sleep early after Isha prayer",
    "timing": "Within 2-3 hours after Isha",
    "hadith_reference": "The Prophet (peace be upon him) used to dislike sleeping before Isha and talking after it"
  },
  "recommended_wake_time": {
    "description": "Wake up for Fajr prayer",
    "timing": "Before Fajr Adhan (call to prayer)",
    "benefit": "The Prophet said: 'Allah blesses my nation in their early mornings'"
  },
  "night_prayer": {
    "description": "Tahajjud (Night Prayer)",
    "timing": "Last third of the night",
    "benefit": "Allah descends to the lowest heaven and responds to supplications"
  },
  "avoid_sleep_times": [
    {
      "time": "Between Maghrib and Isha",
      "reason": "Preparation for Isha prayer"
    },
    {
      "time": "After Fajr until sunrise",
      "reason": "Time for morning Adhkar and remembrance"
    }
  ]
}
```

---

### Get Sleep Tips

Get comprehensive sleep tips based on Islamic guidance.

```http
GET /sleep/tips
```

#### Response

**Status Code:** `200 OK`

```json
{
  "before_sleep": [
    "Perform wudu (ablution) before sleeping",
    "Sleep on your right side",
    "Place your right hand under your cheek",
    "Recite sleeping Azkar and Duas",
    "Read or listen to Quran",
    "Seek forgiveness (Istighfar)",
    "Make intention to wake for night prayer or Fajr"
  ],
  "sleeping_position": {
    "recommended": "Right side",
    "hadith": "The Prophet (peace be upon him) used to sleep on his right side and place his right hand under his right cheek"
  },
  "duas_to_recite": [
    "Bismika Allahumma amutu wa ahya",
    "Allahumma bismika amutu wa ahya",
    "Allahumma qini adhabaka yawma tab'athu 'ibadak",
    "Subhan Allah (33 times)",
    "Alhamdulillah (33 times)",
    "Allahu Akbar (34 times)"
  ],
  "things_to_avoid": [
    "Sleeping on your stomach",
    "Sleeping after Fajr (except briefly)",
    "Staying up very late without necessity",
    "Heavy meals before bed",
    "Neglecting bedtime Azkar"
  ],
  "benefits": [
    "Physical purification through wudu",
    "Spiritual protection through Azkar",
    "Better quality sleep",
    "Increased likelihood of good dreams",
    "Protection from Satan and bad dreams",
    "Blessing in waking up for Fajr"
  ]
}
```

---

### Get Bedtime Azkar Checklist

Get a complete checklist of Azkar and actions to perform before sleeping.

```http
GET /sleep/azkar-checklist
```

#### Response

**Status Code:** `200 OK`

```json
{
  "title": "Bedtime Azkar Checklist",
  "description": "Complete checklist of supplications to recite before sleep",
  "checklist": [
    {
      "order": 1,
      "item": "Perform Wudu (Ablution)",
      "category": "preparation",
      "importance": "Sunnah"
    },
    {
      "order": 2,
      "item": "Recite Ayat al-Kursi (Verse 2:255)",
      "category": "quran",
      "importance": "Highly recommended",
      "benefit": "Protection until morning"
    },
    {
      "order": 3,
      "item": "Recite last 2 verses of Surah Al-Baqarah",
      "category": "quran",
      "importance": "Highly recommended",
      "benefit": "Sufficient protection for the night"
    },
    {
      "order": 4,
      "item": "Recite Al-Ikhlas, Al-Falaq, An-Nas (3 times each)",
      "category": "quran",
      "importance": "Sunnah",
      "benefit": "Complete protection",
      "method": "Blow on hands and wipe over body"
    },
    {
      "order": 5,
      "item": "Bismika Allahumma amutu wa ahya",
      "category": "dua",
      "importance": "Sunnah",
      "translation": "In Your name O Allah, I die and I live"
    },
    {
      "order": 6,
      "item": "A'udhu bi-kalimatillahi at-tammati min sharri ma khalaq",
      "category": "dua",
      "importance": "Recommended",
      "benefit": "Protection from harm"
    },
    {
      "order": 7,
      "item": "Tasbih (Subhan Allah 33x, Alhamdulillah 33x, Allahu Akbar 34x)",
      "category": "dhikr",
      "importance": "Sunnah",
      "benefit": "Better than a servant"
    },
    {
      "order": 8,
      "item": "Make personal Dua",
      "category": "dua",
      "importance": "Recommended",
      "note": "Ask for forgiveness, protection, and good dreams"
    }
  ],
  "note": "All these are from authentic Hadith. Consistency is more important than perfection."
}
```

---

### Log Sleep (Placeholder)

Log sleep data for tracking purposes.

```http
POST /sleep/log
```

#### Request Body

```json
{
  "sleep_date": "2024-01-01",
  "bedtime": "22:00:00",
  "wake_time": "06:00:00",
  "hours_slept": 8.0,
  "quality_rating": 4,
  "notes": "Felt refreshed after reciting Azkar",
  "recited_azkar": true
}
```

#### Response

**Status Code:** `201 Created`

```json
{
  "message": "Sleep log endpoint ready. Authentication required for full functionality.",
  "data": {
    "sleep_date": "2024-01-01",
    "bedtime": "22:00:00",
    "wake_time": "06:00:00",
    "hours_slept": 8.0,
    "quality_rating": 4,
    "notes": "Felt refreshed after reciting Azkar",
    "recited_azkar": true
  }
}
```

---

### Get Sleep Statistics (Placeholder)

Get statistics about sleep patterns.

```http
GET /sleep/stats
```

#### Response

**Status Code:** `200 OK`

```json
{
  "message": "Sleep stats endpoint ready. Authentication required for full functionality.",
  "sample_stats": {
    "total_logs": 0,
    "average_hours": null,
    "average_quality": null,
    "azkar_recitation_rate": null
  }
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "detail": "Invalid request parameters"
}
```

### 404 Not Found

```json
{
  "detail": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "detail": "Internal server error. Please try again later."
}
```

---

## Rate Limiting

**Current Limit:** 60 requests per minute

**Response when exceeded:**
```json
{
  "detail": "Rate limit exceeded. Please try again later."
}
```

---

## CORS

The API supports CORS for the following origins:
- `http://localhost:3000`
- `http://localhost:8000`
- `http://127.0.0.1:3000`

---

## Authentication (Future)

Authentication will be implemented for:
- Creating, updating, and deleting Azkar (Admin only)
- Logging sleep data (User-specific)
- Accessing sleep statistics (User-specific)
- Managing favorites (User-specific)

Authentication will use JWT tokens in the format:
```
Authorization: Bearer <token>
```
