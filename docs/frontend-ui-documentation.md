# Dream Interpreter - Frontend UI Documentation

## Overview

This document provides comprehensive documentation for the Dream Interpreter frontend UI scaffolding. All pages and components have been created with a focus on Islamic aesthetic design, type safety, and reusability.

## 📁 Project Structure

```
frontend/src/
├── components/          # Reusable components
│   ├── Common/         # Shared layout components
│   │   ├── Header.tsx  # Navigation header
│   │   └── Footer.tsx  # Site footer
│   ├── Dream/          # Dream-specific components
│   │   ├── DreamCard.tsx           # Display dream entries
│   │   └── InterpretationCard.tsx  # Show interpretations
│   ├── Social/         # Social interaction components
│   │   ├── CommentList.tsx   # Display comments
│   │   └── CommentForm.tsx   # Add comments
│   ├── ui/             # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Loading.tsx
│   │   └── EmptyState.tsx
│   └── Layout/         # Layout wrapper
│       └── Layout.tsx
├── pages/              # Page components
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── HomePage.tsx
│   ├── DreamJournalPage.tsx
│   ├── NewDreamPage.tsx
│   ├── InterpretationPage.tsx
│   ├── SocialPage.tsx
│   ├── ProfilePage.tsx
│   ├── IstkharaPage.tsx
│   ├── AzkarPage.tsx
│   └── SleepPage.tsx
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useIntersectionObserver.ts
│   └── useMediaQuery.ts
├── utils/              # Utility functions
│   ├── cn.ts          # Class name merger
│   ├── date.ts        # Date formatting
│   ├── storage.ts     # LocalStorage wrapper
│   ├── validation.ts  # Zod schemas
│   └── formatters.ts  # Text/number formatting
├── types/              # TypeScript definitions
│   └── index.ts       # All type definitions
├── services/           # API services
│   └── api.ts         # Axios configuration
└── styles/            # Global styles
    └── index.css
```

## 🎨 Design System

### Color Palette

The application uses an Islamic-inspired color palette defined in `tailwind.config.js`:

**Primary Colors:**
- **Islamic Green**: `islamic-green-500` (#16a34a) - Main brand color
- **Islamic Gold**: `islamic-gold-500` (#eab308) - Accent highlights
- **Islamic Teal**: `islamic-teal-500` (#14b8a6) - Secondary accent
- **Islamic Navy**: `islamic-navy-800` (#075985) - Deep contrast

**Usage Examples:**
```tsx
// Buttons
<Button variant="primary">Submit</Button>  // Green
<Button variant="secondary">Cancel</Button> // Teal

// Text
<h1 className="text-islamic-green-700">Title</h1>

// Backgrounds
<div className="bg-islamic-green-50">Light background</div>
```

### Typography

**Font Families:**
- `font-sans` - Inter (default)
- `font-arabic` - Amiri (for Arabic text)
- `font-display` - Playfair Display (headings)

**Usage:**
```tsx
<h1 className="font-display">Dream Interpreter</h1>
<p className="font-arabic" dir="rtl">{arabicText}</p>
```

### Spacing & Layout

- Mobile-first responsive design
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Max content width: 1280px (7xl)
- Standard padding: `px-4 sm:px-6 lg:px-8`

## 🧩 Component Library

### UI Components

#### Button
Versatile button component with multiple variants and sizes.

**Props:**
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  disabled?: boolean
}
```

**Usage:**
```tsx
import { Button } from '@components/ui'

<Button variant="primary" size="md" onClick={handleClick}>
  Submit
</Button>

<Button variant="outline" isLoading={loading}>
  Loading...
</Button>
```

#### Input
Form input with label, error states, and helper text.

**Props:**
```tsx
interface InputProps {
  label?: string
  error?: string
  helperText?: string
  type?: string
}
```

**Usage:**
```tsx
import { Input } from '@components/ui'

<Input
  label="Email"
  type="email"
  placeholder="your@email.com"
  error={errors.email?.message}
  {...register('email')}
/>
```

#### Card
Container component with header, body, and footer sections.

**Variants:**
- `default` - Standard white card with shadow
- `bordered` - Card with border, no shadow
- `elevated` - Card with large shadow

**Usage:**
```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@components/ui'

<Card variant="elevated">
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardBody>
    <p>Card content</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

#### Modal
Accessible modal dialog using Headless UI.

**Props:**
```tsx
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showCloseButton?: boolean
}
```

**Usage:**
```tsx
import { Modal } from '@components/ui'

const [isOpen, setIsOpen] = useState(false)

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  description="Are you sure?"
>
  <div>Modal content</div>
</Modal>
```

#### Loading
Loading spinner with optional text and fullscreen mode.

**Usage:**
```tsx
import { Loading } from '@components/ui'

<Loading size="lg" text="Loading dreams..." />
<Loading fullScreen text="Please wait..." />
```

#### EmptyState
Display when no content is available.

**Usage:**
```tsx
import { EmptyState } from '@components/ui'
import { BookOpen } from 'lucide-react'

<EmptyState
  icon={BookOpen}
  title="No dreams yet"
  description="Start your journey by recording your first dream"
  action={{
    label: 'Record Dream',
    onClick: handleCreate
  }}
/>
```

### Domain Components

#### DreamCard
Displays a dream entry with metadata, tags, and interaction counts.

**Props:**
```tsx
interface DreamCardProps {
  dream: Dream
  onClick?: () => void
}
```

**Usage:**
```tsx
import { DreamCard } from '@components/Dream'

<DreamCard
  dream={dreamData}
  onClick={() => navigate(`/dream/${dreamData.id}`)}
/>
```

#### InterpretationCard
Shows an interpretation with type indicator, content, and references.

**Usage:**
```tsx
import { InterpretationCard } from '@components/Dream'

<InterpretationCard interpretation={interpretationData} />
```

#### CommentList & CommentForm
Social interaction components for comments.

**Usage:**
```tsx
import { CommentList, CommentForm } from '@components/Social'

<CommentForm onSubmit={handleCommentSubmit} />
<CommentList comments={comments} onLike={handleLike} />
```

## 📄 Pages

### Authentication Pages

#### LoginPage (`/login`)
- Email/password login form
- Form validation with Zod
- Remember me checkbox
- Forgot password link
- Redirect to signup

**Features:**
- Mock authentication (ready for API integration)
- Error handling with toast notifications
- Automatic redirect to journal on success

#### SignupPage (`/signup`)
- Registration form with validation
- Password strength requirements
- Terms acceptance checkbox
- Redirect to login

### Core Pages

#### HomePage (`/`)
- Hero section with CTA buttons
- Feature showcase grid
- "How It Works" section
- Responsive design
- Different CTAs for authenticated/unauthenticated users

#### DreamJournalPage (`/journal`)
- Personal dream list
- Filter buttons (All, Istikhara, This Month, Interpreted)
- Create new dream button
- Empty state with CTA
- Dream cards with click navigation

**Protected Route:** ✅

#### NewDreamPage (`/dream/new`)
- Comprehensive dream entry form
- Fields:
  - Title
  - Date
  - Content (long textarea)
  - Mood selector (positive, negative, neutral, mixed)
  - Istikhara checkbox with special UI
  - Public/private toggle
- Form validation
- Auto-save draft capability (TODO)

**Protected Route:** ✅

#### InterpretationPage (`/dream/:id`)
- Dream details display
- Request interpretation buttons (AI or Imam)
- Interpretation cards list
- Comments section (for public dreams)
- Like/unlike functionality
- Share capabilities (TODO)

**Protected Route:** ✅

### Social Pages

#### SocialPage (`/social`)
- Community feed of public dreams
- Filter: Recent vs Trending
- Dream cards with user info
- Infinite scroll ready (TODO)

**Protected Route:** ✅

#### ProfilePage (`/profile`)
- User avatar/initials
- Profile information
- Editable bio
- Statistics dashboard
- Settings panel
- Account deletion

**Protected Route:** ✅

### Islamic Features Pages

#### IstkharaPage (`/istikhara`)
- Information about Istikhara prayer
- Arabic prayer text with transliteration
- Interpretation guidelines
- List of Istikhara dreams
- Special UI highlighting

**Protected Route:** ✅

#### AzkarPage (`/azkar`)
- Night prayers and remembrance
- Expandable dhikr cards
- Arabic text with English translation
- Audio playback (TODO)
- Category tabs (Before Sleep / After Waking)
- Sunnah sleep etiquette

**Open to all users**

#### SleepPage (`/sleep`)
- Sleep tracking dashboard
- Statistics cards (avg duration, quality, total entries)
- Log sleep entry form
- Sleep history list
- Quality rating (1-5 stars)
- Sleep tips based on Sunnah

**Protected Route:** ✅

## 🔧 Custom Hooks

### useAuth
Zustand-based authentication state management.

**API:**
```tsx
const {
  user,              // Current user object
  tokens,            // Auth tokens
  isAuthenticated,   // Boolean auth status
  isLoading,         // Loading state
  login,             // Login function
  signup,            // Signup function
  logout,            // Logout function
  updateUser,        // Update user data
  initialize,        // Initialize auth from storage
} = useAuth()
```

**Usage:**
```tsx
import { useAuth } from '@hooks/useAuth'

const { user, login, logout } = useAuth()

const handleLogin = async (credentials) => {
  await login(credentials)
  navigate('/journal')
}
```

### useDebounce
Debounce a value to reduce API calls.

**Usage:**
```tsx
import { useDebounce } from '@hooks/useDebounce'

const [search, setSearch] = useState('')
const debouncedSearch = useDebounce(search, 500)

useEffect(() => {
  // API call with debouncedSearch
}, [debouncedSearch])
```

### useMediaQuery
Responsive breakpoint detection.

**Usage:**
```tsx
import { useIsMobile, useIsTablet, useIsDesktop } from '@hooks/useMediaQuery'

const isMobile = useIsMobile()  // < 768px
const isTablet = useIsTablet()  // 769px - 1024px
const isDesktop = useIsDesktop() // > 1025px
```

## 🛠 Utility Functions

### Date Formatting

```tsx
import { formatDate, formatRelativeDate, formatRelativeTime } from '@utils/date'

formatDate(date, 'PPP')              // January 1, 2024
formatRelativeDate(date)             // 2 hours ago
formatRelativeTime(date)             // yesterday at 3:00 PM
```

### Storage

```tsx
import { storage, STORAGE_KEYS } from '@utils/storage'

storage.set(STORAGE_KEYS.AUTH_TOKEN, token)
const token = storage.get(STORAGE_KEYS.AUTH_TOKEN)
storage.remove(STORAGE_KEYS.AUTH_TOKEN)
storage.clear()
```

### Validation

```tsx
import { loginSchema, dreamSchema } from '@utils/validation'

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(loginSchema)
})
```

### Formatters

```tsx
import {
  truncate,
  formatNumber,
  getMoodEmoji,
  getInitials,
  formatSleepQuality
} from '@utils/formatters'

truncate(text, 100)        // "Long text..."
formatNumber(1500)         // "1.5k"
getMoodEmoji('positive')   // 😊
getInitials('John Doe')    // "JD"
formatSleepQuality(4.5)    // "Excellent"
```

## 🔐 TypeScript Types

All types are defined in `frontend/src/types/index.ts`:

### Core Types

```typescript
// User
interface User {
  id: string
  email: string
  username: string
  full_name?: string
  avatar_url?: string
  bio?: string
  is_verified: boolean
  created_at: string
  updated_at: string
}

// Dream
interface Dream {
  id: string
  user_id: string
  title: string
  content: string
  dream_date: string
  mood?: 'positive' | 'negative' | 'neutral' | 'mixed'
  is_istikhara: boolean
  is_public: boolean
  tags: string[]
  interpretations: Interpretation[]
  likes_count: number
  comments_count: number
  is_liked?: boolean
  created_at: string
  updated_at: string
  user?: User
}

// Interpretation
interface Interpretation {
  id: string
  dream_id: string
  interpreter_id?: string
  interpretation_type: 'ai' | 'imam' | 'community'
  content: string
  confidence_score?: number
  status: 'pending' | 'in_progress' | 'completed' | 'rejected'
  references?: string[]
  tags: string[]
  likes_count: number
  is_liked?: boolean
  created_at: string
  updated_at: string
  interpreter?: User
}
```

See the full type definitions file for all available types.

## 🔄 Routing & Navigation

### Route Structure

```tsx
// Public routes
/                    - HomePage
/login              - LoginPage (public only)
/signup             - SignupPage (public only)
/azkar              - AzkarPage (open to all)

// Protected routes (requires authentication)
/journal            - DreamJournalPage
/dream/new          - NewDreamPage
/dream/:id          - InterpretationPage
/social             - SocialPage
/profile            - ProfilePage
/istikhara          - IstkharaPage
/sleep              - SleepPage
```

### Navigation

Navigation is handled in the Header component:

```tsx
const navigation = [
  { name: 'Journal', href: '/journal', icon: BookOpen },
  { name: 'Community', href: '/social', icon: Users },
  { name: 'Istikhara', href: '/istikhara', icon: Moon },
  { name: 'Azkar', href: '/azkar', icon: Heart },
]
```

## 🚀 Backend Integration Guide

### API Service Setup

The `frontend/src/services/api.ts` file contains the Axios configuration:

```tsx
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',  // Proxied to http://localhost:8000 in dev
  timeout: 10000,
})

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = storage.get(STORAGE_KEYS.AUTH_TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      useAuth.getState().logout()
    }
    return Promise.reject(error)
  }
)
```

### Integration Points

Each page has TODO comments where API calls should be added:

**Example from DreamJournalPage:**
```tsx
// TODO: Replace with actual API call
const fetchDreams = async () => {
  try {
    const response = await api.get('/dreams')
    setDreams(response.data.items)
  } catch (error) {
    toast.error('Failed to load dreams')
  }
}
```

**Example from NewDreamPage:**
```tsx
const onSubmit = async (data: CreateDreamData) => {
  try {
    // TODO: Replace with actual API call
    const response = await api.post('/dreams', data)
    toast.success('Dream recorded!')
    navigate(`/dream/${response.data.id}`)
  } catch (error) {
    toast.error('Failed to save dream')
  }
}
```

### React Query Integration

The app is already set up with React Query. Example usage:

```tsx
import { useQuery, useMutation } from '@tanstack/react-query'

// Fetch dreams
const { data: dreams, isLoading } = useQuery({
  queryKey: ['dreams'],
  queryFn: () => api.get('/dreams').then(res => res.data)
})

// Create dream
const createDream = useMutation({
  mutationFn: (data: CreateDreamData) => api.post('/dreams', data),
  onSuccess: () => {
    queryClient.invalidateQueries(['dreams'])
    toast.success('Dream created!')
  }
})
```

## 📱 Responsive Design

All pages are fully responsive with mobile-first design:

### Breakpoints
- **Mobile**: < 768px (base styles)
- **Tablet**: 768px - 1024px (`md:`)
- **Desktop**: > 1024px (`lg:`, `xl:`)

### Mobile Navigation

The Header component includes a mobile menu that appears on smaller screens:
- Hamburger menu icon
- Slide-out navigation
- Conditional rendering based on screen size

### Grid Layouts

Common responsive patterns used:

```tsx
// Stack on mobile, side-by-side on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Full width on mobile, constrained on desktop
<div className="w-full max-w-md mx-auto">

// Different padding on mobile vs desktop
<div className="px-4 sm:px-6 lg:px-8">
```

## ✅ Next Steps for Backend Integration

1. **Authentication API**
   - Implement `/api/auth/login` endpoint
   - Implement `/api/auth/signup` endpoint
   - Implement `/api/auth/refresh` for token refresh
   - Update `useAuth` hook with real API calls

2. **Dreams API**
   - GET `/api/dreams` - List user's dreams
   - POST `/api/dreams` - Create new dream
   - GET `/api/dreams/:id` - Get dream details
   - PATCH `/api/dreams/:id` - Update dream
   - DELETE `/api/dreams/:id` - Delete dream

3. **Interpretations API**
   - POST `/api/interpretations` - Request interpretation
   - GET `/api/interpretations/:id` - Get interpretation
   - POST `/api/dreams/:id/interpretations` - Add interpretation to dream

4. **Social API**
   - GET `/api/dreams/public` - Get public dreams feed
   - POST `/api/dreams/:id/comments` - Add comment
   - POST `/api/dreams/:id/like` - Like/unlike dream

5. **User API**
   - GET `/api/users/me` - Get current user
   - PATCH `/api/users/me` - Update profile
   - GET `/api/users/:id/stats` - Get user stats

6. **Sleep Tracking API**
   - GET `/api/sleep` - Get sleep entries
   - POST `/api/sleep` - Create sleep entry
   - GET `/api/sleep/stats` - Get sleep statistics

7. **Islamic Content API**
   - GET `/api/azkar` - Get night prayers
   - GET `/api/symbols` - Get dream symbols database

## 🎯 Testing Checklist

Before deploying, test the following:

- [ ] All routes are accessible
- [ ] Protected routes redirect to login when not authenticated
- [ ] Forms validate correctly
- [ ] Error states display properly
- [ ] Loading states work
- [ ] Mobile navigation functions
- [ ] All icons render (Lucide React)
- [ ] Tailwind styles compile correctly
- [ ] TypeScript has no errors
- [ ] Components are accessible (keyboard navigation)

## 📚 Resources

- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org
- **Tailwind CSS**: https://tailwindcss.com
- **React Router**: https://reactrouter.com
- **React Hook Form**: https://react-hook-form.com
- **Zod**: https://zod.dev
- **Lucide Icons**: https://lucide.dev
- **Headless UI**: https://headlessui.com
- **React Query**: https://tanstack.com/query

## 🤝 Contributing

When adding new components:

1. Follow existing naming conventions
2. Use TypeScript strict mode
3. Include proper prop types
4. Add JSDoc comments for complex functions
5. Use Tailwind classes (no inline styles)
6. Make components responsive
7. Test accessibility
8. Export from index files

## 📝 Notes

- All components use functional components with hooks
- State management via Zustand (auth) and React Query (server state)
- Forms use React Hook Form with Zod validation
- Icons from Lucide React
- Toast notifications via react-hot-toast
- Modal dialogs via Headless UI
- All dates formatted with date-fns
- LocalStorage wrapped with type-safe utility

---

**Last Updated**: November 2024
**Version**: 1.0.0
**Status**: ✅ UI Scaffolding Complete - Ready for Backend Integration
