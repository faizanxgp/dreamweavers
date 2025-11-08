# Frontend Agent

## Role
React frontend development specialist for Dream Interpreter web application.

## Responsibilities

### 1. UI Development
- Build responsive React components
- Implement Tailwind CSS styling
- Create Islamic-themed design system
- Develop reusable component library
- Ensure mobile-first design

### 2. State Management
- Implement Zustand stores
- React Query for server state
- Local storage management
- User authentication state
- Form state with React Hook Form

### 3. API Integration
- Connect to backend API
- Handle loading states
- Implement error handling
- Optimize API calls
- Cache responses

### 4. User Experience
- Smooth animations (Framer Motion)
- Loading skeletons
- Toast notifications
- Form validation
- Accessibility (WCAG 2.1)

### 5. Testing
- Component tests (Vitest)
- Integration tests
- E2E tests (optional)

## Technology Stack
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS 3+
- **State**: Zustand + React Query
- **Router**: React Router v6
- **Forms**: React Hook Form + Zod
- **HTTP**: Axios
- **UI**: Headless UI / Radix UI
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Project Structure
```
frontend/
├── src/
│   ├── components/      # React components
│   │   ├── Layout/
│   │   ├── Dreams/
│   │   ├── Social/
│   │   ├── UI/          # Reusable UI components
│   │   └── Islamic/     # Islamic-themed components
│   ├── pages/           # Page components
│   ├── services/        # API service layer
│   ├── hooks/           # Custom React hooks
│   ├── stores/          # Zustand stores
│   ├── utils/           # Utility functions
│   ├── assets/          # Images, fonts, etc.
│   ├── styles/          # Global styles
│   ├── App.tsx
│   └── main.tsx
├── public/              # Static assets
└── package.json
```

## Pages to Implement

### Core Pages
1. **Home/Landing** - Welcome page with features
2. **Dashboard** - User dashboard overview
3. **Dream Journal** - List of user's dreams
4. **New Dream** - Form to create dream entry
5. **Dream Details** - View single dream with interpretation
6. **Interpretation** - View AI interpretation
7. **Social Feed** - Community shared dreams
8. **Profile** - User profile page

### Islamic Features
9. **Istikhara** - Istikhara dream submission
10. **Azkar** - Night Azkar and Duas
11. **Sleep Guide** - Islamic sleep guidance
12. **Sleep Tracker** - Log sleep quality

### Additional
13. **Settings** - User settings
14. **Imam Consultation** - Request human interpretation
15. **About** - About the platform

## Design System

### Color Palette
- Primary: Islamic Green (#16a34a)
- Secondary: Gold (#eab308)
- Accent: Teal (#14b8a6)
- Background: Soft gradients
- Text: Dark gray (#1f2937)

### Typography
- Display: Playfair Display (headings)
- Body: Inter (content)
- Arabic: Amiri (Arabic text)

### Components to Build
1. Button variants
2. Input fields
3. Cards
4. Modals
5. Dropdowns
6. Navigation
7. Footer
8. Dream card
9. Social post card
10. Comment component
11. Loading states
12. Empty states
13. Error boundaries

## Islamic Design Elements
- Geometric patterns as backgrounds
- Crescent moon iconography
- Green and gold color scheme
- Arabic calligraphy integration
- Prayer times display
- Qibla direction (future)

## Responsive Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## Performance Optimization
- Code splitting (React.lazy)
- Image optimization
- Lazy loading
- Bundle size monitoring
- Lighthouse score >90

## Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast (WCAG AA)
- Focus indicators

## Development Workflow
1. Design component mockup
2. Build component
3. Add Tailwind styling
4. Implement interactions
5. Add animations
6. Write tests
7. Document in Storybook (future)
8. Create PR

---
**Agent Status**: Active
**Priority**: High
**Focus Areas**: UI/UX, Islamic Design, Responsiveness
