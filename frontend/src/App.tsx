import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useAuth } from '@hooks/useAuth'

// Import pages
import HomePage from '@pages/HomePage'
import LoginPage from '@pages/LoginPage'
import SignupPage from '@pages/SignupPage'
import DreamJournalPage from '@pages/DreamJournalPage'
import NewDreamPage from '@pages/NewDreamPage'
import InterpretationPage from '@pages/InterpretationPage'
import SocialPage from '@pages/SocialPage'
import ProfilePage from '@pages/ProfilePage'
import IstkharaPage from '@pages/IstkharaPage'
import AzkarPage from '@pages/AzkarPage'
import SleepPage from '@pages/SleepPage'

// Layout components
import Layout from '@components/Layout/Layout'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-islamic-green-200 border-t-islamic-green-600"></div>
      </div>
    )
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

// Public Only Route Component (redirect to journal if already authenticated)
function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-islamic-green-200 border-t-islamic-green-600"></div>
      </div>
    )
  }

  return !isAuthenticated ? <>{children}</> : <Navigate to="/journal" />
}

function AppContent() {
  const { initialize } = useAuth()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div className="min-h-screen bg-gradient-to-br from-islamic-green-50 via-white to-islamic-teal-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
        <Route path="/signup" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} />

        {/* Protected Routes */}
        <Route path="/journal" element={<ProtectedRoute><Layout><DreamJournalPage /></Layout></ProtectedRoute>} />
        <Route path="/dream/new" element={<ProtectedRoute><Layout><NewDreamPage /></Layout></ProtectedRoute>} />
        <Route path="/dream/:id" element={<ProtectedRoute><Layout><InterpretationPage /></Layout></ProtectedRoute>} />
        <Route path="/social" element={<ProtectedRoute><Layout><SocialPage /></Layout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Layout><ProfilePage /></Layout></ProtectedRoute>} />
        <Route path="/istikhara" element={<ProtectedRoute><Layout><IstkharaPage /></Layout></ProtectedRoute>} />
        <Route path="/azkar" element={<Layout><AzkarPage /></Layout>} />
        <Route path="/sleep" element={<ProtectedRoute><Layout><SleepPage /></Layout></ProtectedRoute>} />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#16a34a',
            color: '#fff',
          },
        }}
      />
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  )
}

export default App
