# Islamic Azkar and Sleep Guidance Features

## Overview

This document describes the Islamic Azkar (supplications) and Sleep Guidance features implemented in the Dream Interpreter Platform. These features provide users with authentic Islamic content to help them prepare for sleep, recite proper supplications, and follow the Sunnah of Prophet Muhammad (peace be upon him).

## Table of Contents

1. [Features Overview](#features-overview)
2. [Backend API](#backend-api)
3. [Frontend Components](#frontend-components)
4. [Database Schema](#database-schema)
5. [Usage Examples](#usage-examples)
6. [Development Guide](#development-guide)

---

## Features Overview

### Azkar (Islamic Supplications)

The Azkar feature provides users with:
- Authentic supplications from the Quran and Hadith
- Arabic text with proper RTL (right-to-left) formatting
- Transliteration for pronunciation guidance
- English translations
- References to original Islamic sources (Quran, Bukhari, Muslim, etc.)
- Category-based organization (night, sleep, morning, evening)
- Beautiful Islamic-themed UI

### Sleep Guidance

The Sleep Guidance feature offers:
- Islamic recommendations for bedtime routines
- Recommended sleep and wake times according to Sunnah
- Comprehensive tips from Islamic tradition
- Interactive bedtime Azkar checklist with progress tracking
- Information about optimal sleep positions
- Things to avoid before sleep
- Benefits of following Islamic sleep practices

---

## Backend API

### Base URL
```
http://localhost:8000/api/v1
```

### Azkar Endpoints

#### 1. Get All Azkar
```http
GET /azkar?category={category}&skip={skip}&limit={limit}
```

**Query Parameters:**
- `category` (optional): Filter by category (night, sleep, morning, evening)
- `skip` (optional): Number of records to skip (default: 0)
- `limit` (optional): Maximum records to return (default: 100, max: 200)

**Response:**
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

#### 2. Get Night Azkar
```http
GET /azkar/night
```

Returns all Azkar in the "night" category, ordered by `display_order`.

#### 3. Get Sleep Duas
```http
GET /azkar/sleep
```

Returns all Azkar in the "sleep" category.

#### 4. Get Morning Azkar
```http
GET /azkar/morning
```

Returns all Azkar in the "morning" category.

#### 5. Get Evening Azkar
```http
GET /azkar/evening
```

Returns all Azkar in the "evening" category.

#### 6. Get Specific Azkar
```http
GET /azkar/{azkar_id}
```

Returns a single Azkar by ID.

#### 7. Create Azkar (Admin)
```http
POST /azkar
Content-Type: application/json

{
  "arabic_text": "string",
  "transliteration": "string (optional)",
  "translation": "string",
  "category": "night | sleep | morning | evening",
  "reference": "string (optional)",
  "display_order": 0
}
```

#### 8. Update Azkar (Admin)
```http
PUT /azkar/{azkar_id}
Content-Type: application/json

{
  "arabic_text": "string (optional)",
  "transliteration": "string (optional)",
  "translation": "string (optional)",
  "category": "string (optional)",
  "reference": "string (optional)",
  "display_order": 0 (optional)
}
```

#### 9. Delete Azkar (Admin)
```http
DELETE /azkar/{azkar_id}
```

### Sleep Guidance Endpoints

#### 1. Get Sleep Guidance
```http
GET /sleep/guidance
```

**Response:**
```json
{
  "recommendation": "Follow the Sunnah of the Prophet Muhammad...",
  "suggested_bedtime": "Within 2-3 hours after Isha prayer",
  "azkar_suggestions": [
    "Recite Ayat al-Kursi before sleeping",
    "Recite the last three Surahs..."
  ],
  "tips": [
    "Avoid heavy meals 2-3 hours before bed",
    "Ensure your room is dark and quiet"
  ]
}
```

#### 2. Get Islamic Sleep Times
```http
GET /sleep/islamic-times
```

**Response:**
```json
{
  "recommended_bedtime": {
    "description": "Sleep early after Isha prayer",
    "timing": "Within 2-3 hours after Isha",
    "hadith_reference": "The Prophet (peace be upon him)..."
  },
  "recommended_wake_time": {
    "description": "Wake up for Fajr prayer",
    "timing": "Before Fajr Adhan",
    "benefit": "Allah blesses my nation in their early mornings"
  },
  "night_prayer": {
    "description": "Tahajjud (Night Prayer)",
    "timing": "Last third of the night",
    "benefit": "Allah descends to the lowest heaven..."
  },
  "avoid_sleep_times": [...]
}
```

#### 3. Get Sleep Tips
```http
GET /sleep/tips
```

**Response:**
```json
{
  "before_sleep": [
    "Perform wudu (ablution) before sleeping",
    "Sleep on your right side"
  ],
  "sleeping_position": {
    "recommended": "Right side",
    "hadith": "The Prophet (peace be upon him) used to sleep..."
  },
  "duas_to_recite": [...],
  "things_to_avoid": [...],
  "benefits": [...]
}
```

#### 4. Get Bedtime Azkar Checklist
```http
GET /sleep/azkar-checklist
```

**Response:**
```json
{
  "title": "Bedtime Azkar Checklist",
  "description": "Complete checklist of supplications...",
  "checklist": [
    {
      "order": 1,
      "item": "Perform Wudu (Ablution)",
      "category": "preparation",
      "importance": "Sunnah",
      "benefit": "Physical purification"
    }
  ],
  "note": "All these are from authentic Hadith..."
}
```

#### 5. Log Sleep (Placeholder)
```http
POST /sleep/log
Content-Type: application/json

{
  "sleep_date": "2024-01-01",
  "bedtime": "22:00:00",
  "wake_time": "06:00:00",
  "hours_slept": 8.0,
  "quality_rating": 4,
  "notes": "string (optional)",
  "recited_azkar": true
}
```

#### 6. Get Sleep Stats (Placeholder)
```http
GET /sleep/stats
```

---

## Frontend Components

### Azkar Components

#### AzkarCard
**Location:** `/frontend/src/components/Azkar/AzkarCard.tsx`

Displays an individual Azkar with beautiful formatting.

**Props:**
```typescript
interface AzkarCardProps {
  azkar: Azkar
  index: number  // For animation delay
}
```

**Features:**
- Arabic text with RTL formatting and proper font
- Transliteration in italics
- Translation with good readability
- Category badge
- Reference citation
- Smooth fade-in animation

#### AzkarList
**Location:** `/frontend/src/components/Azkar/AzkarList.tsx`

Displays a filterable list of Azkar.

**Features:**
- Category filter buttons (All, Night, Sleep, Morning, Evening)
- Loading state with spinner
- Error handling
- Empty state message
- Count of displayed items
- Uses React Query for data fetching

#### AzkarPage
**Location:** `/frontend/src/pages/AzkarPage.tsx`

Complete page for browsing Azkar.

**Features:**
- Page header with description
- Information card about Azkar
- AzkarList component
- Footer note
- Responsive layout
- Smooth animations

### Sleep Guidance Components

#### SleepGuidanceCard
**Location:** `/frontend/src/components/Sleep/SleepGuidanceCard.tsx`

Reusable card component for displaying sleep guidance sections.

**Props:**
```typescript
interface SleepGuidanceCardProps {
  title: string
  children: React.ReactNode
  icon?: string       // Default: '🌙'
  delay?: number      // Animation delay
}
```

#### AzkarChecklist
**Location:** `/frontend/src/components/Sleep/AzkarChecklist.tsx`

Interactive checklist for bedtime Azkar with progress tracking.

**Props:**
```typescript
interface AzkarChecklistProps {
  items: AzkarChecklistItem[]
}
```

**Features:**
- Progress bar showing completion percentage
- Clickable items with checkbox
- Visual feedback on completion
- Color-coded importance levels
- Displays benefits, translations, and methods
- Completion celebration message
- Smooth animations

#### SleepPage
**Location:** `/frontend/src/pages/SleepPage.tsx`

Comprehensive sleep guidance page.

**Features:**
- Main sleep guidance card
- Islamic sleep times section
- Sleep tips from Sunnah
- Interactive bedtime Azkar checklist
- Responsive grid layout
- Uses React Query for data fetching

---

## Database Schema

### Azkar Table

```sql
CREATE TABLE azkar (
    id SERIAL PRIMARY KEY,

    -- Content
    arabic_text TEXT NOT NULL,
    transliteration TEXT,
    translation TEXT NOT NULL,

    -- Category
    category VARCHAR(100) NOT NULL,

    -- Reference
    reference TEXT,

    -- Order
    display_order INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_azkar_category ON azkar(category);
CREATE INDEX idx_azkar_display_order ON azkar(display_order);
```

### Seed Data

The database is pre-populated with 10 authentic Islamic supplications:
- 7 sleep-specific Duas
- 3 Quranic verses (Al-Ikhlas, Al-Falaq, An-Nas)

**Seed File:** `/db/seeds/001_azkar_seed.sql`

---

## Usage Examples

### Frontend - Display Azkar

```typescript
import AzkarPage from '@/pages/AzkarPage'

// In your router
<Route path="/azkar" element={<AzkarPage />} />
```

### Frontend - Display Sleep Guidance

```typescript
import SleepPage from '@/pages/SleepPage'

// In your router
<Route path="/sleep" element={<SleepPage />} />
```

### Backend - Fetch Azkar

```python
from app.api.v1.endpoints.azkar import get_all_azkar
from app.db.session import get_db

# Get all sleep Duas
async def example():
    async for db in get_db():
        result = await get_all_azkar(category="sleep", db=db)
        return result
```

### API - Fetch Sleep Guidance

```javascript
import { sleepAPI } from '@/services/api'

// Fetch sleep guidance
const guidance = await sleepAPI.getGuidance()

// Fetch Islamic sleep times
const times = await sleepAPI.getIslamicTimes()

// Fetch bedtime checklist
const checklist = await sleepAPI.getAzkarChecklist()
```

---

## Development Guide

### Adding New Azkar

1. **Via Database:**
   ```sql
   INSERT INTO azkar (arabic_text, transliteration, translation, category, reference, display_order)
   VALUES (
       'Arabic text here',
       'Transliteration here',
       'English translation here',
       'sleep',
       'Bukhari 1234',
       10
   );
   ```

2. **Via API:**
   ```bash
   curl -X POST http://localhost:8000/api/v1/azkar \
     -H "Content-Type: application/json" \
     -d '{
       "arabic_text": "Arabic text",
       "transliteration": "Transliteration",
       "translation": "English translation",
       "category": "sleep",
       "reference": "Bukhari 1234",
       "display_order": 10
     }'
   ```

### Extending Categories

To add new categories (e.g., "waking", "travel"):

1. **Backend:** No code changes needed - categories are dynamic
2. **Frontend:** Update category filter in `AzkarList.tsx`:
   ```typescript
   const categories = [
     { value: '', label: 'All' },
     { value: 'night', label: 'Night' },
     { value: 'sleep', label: 'Sleep' },
     { value: 'morning', label: 'Morning' },
     { value: 'evening', label: 'Evening' },
     { value: 'waking', label: 'Waking' },     // Add new
     { value: 'travel', label: 'Travel' },     // Add new
   ]
   ```

### Customizing Sleep Guidance

Sleep guidance is returned from the backend. To customize:

1. Edit `/backend/app/api/v1/endpoints/sleep.py`
2. Modify the `get_sleep_guidance()` function
3. Update the response data as needed

### Styling

All components use Tailwind CSS with Islamic-themed colors:

```javascript
// tailwind.config.js
colors: {
  islamic: {
    green: { 500: '#16a34a', 700: '#166534' },
    gold: { 500: '#eab308' },
    teal: { 500: '#14b8a6' },
    navy: { 800: '#075985' }
  }
}
```

### Testing

To test the features:

1. **Start Backend:**
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Navigate to:**
   - Azkar: http://localhost:3000/azkar
   - Sleep Guidance: http://localhost:3000/sleep

4. **API Documentation:**
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

---

## Authentication (Future Enhancement)

Currently, the Azkar endpoints are public. For production:

1. Add authentication middleware to admin endpoints (POST, PUT, DELETE)
2. Implement user favorites system
3. Add personal Azkar collections
4. Track which Azkar users have recited

Example:
```python
from app.api.dependencies import get_current_user

@router.post("/azkar", response_model=AzkarResponse)
async def create_azkar(
    azkar_data: AzkarCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)  # Add auth
):
    # Only allow admins
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    ...
```

---

## Islamic Authenticity

All content has been sourced from authentic Islamic references:

- **Quran:** Al-Ikhlas (112), Al-Falaq (113), An-Nas (114), Ayat al-Kursi (2:255)
- **Hadith Collections:** Sahih Bukhari, Sahih Muslim, Abu Dawud, At-Tirmidhi
- **Classical Scholars:** Ibn Sirin, Al-Nabulsi (for dream interpretation context)

References are provided for each supplication to allow users to verify authenticity.

---

## Accessibility

The components are built with accessibility in mind:

- ✅ Semantic HTML structure
- ✅ ARIA labels where appropriate
- ✅ Keyboard navigation support
- ✅ High contrast text
- ✅ Responsive design for all screen sizes
- ✅ RTL support for Arabic text

---

## Performance Optimization

- React Query caching (5-minute stale time)
- Lazy loading of components
- Optimized re-renders with proper memoization
- Efficient database queries with indexes
- Pagination support for large datasets

---

## Future Enhancements

1. **Audio Recitation:** Add audio playback for proper pronunciation
2. **Favorites System:** Allow users to save favorite Azkar
3. **Reminders:** Push notifications for bedtime Azkar
4. **Progress Tracking:** Track consistency in reciting Azkar
5. **Multilingual Support:** Add translations in other languages
6. **Dark Mode:** Islamic-themed dark mode for night use
7. **Offline Support:** PWA with offline access to Azkar
8. **Search Functionality:** Search Azkar by keyword or reference

---

## Support and Contributions

For questions or contributions, please refer to the main project documentation.

May Allah accept this work and make it beneficial for the Muslim community. Ameen.
