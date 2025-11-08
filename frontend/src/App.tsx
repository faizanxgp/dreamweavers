import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

// Import pages (to be created)
// import HomePage from '@pages/HomePage'
// import DreamJournal from '@pages/DreamJournal'
// import NewDream from '@pages/NewDream'
// import Interpretation from '@pages/Interpretation'
// import Social from '@pages/Social'
// import Profile from '@pages/Profile'
// import IstkharaPage from '@pages/IstkharaPage'
// import AzkarPage from '@pages/AzkarPage'
// import SleepPage from '@pages/SleepPage'

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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-islamic-green-50 via-white to-islamic-teal-50">
          <Layout>
            <Routes>
              <Route path="/" element={<div className="p-8 text-center">
                <h1 className="text-4xl font-display text-islamic-green-700 mb-4">
                  Dream Interpreter
                </h1>
                <p className="text-lg text-gray-600">
                  Islamic Dream Interpretation Platform
                </p>
                <p className="mt-4 text-sm text-gray-500">
                  Frontend is ready! Pages coming soon...
                </p>
              </div>} />
              {/* <Route path="/journal" element={<DreamJournal />} /> */}
              {/* <Route path="/dream/new" element={<NewDream />} /> */}
              {/* <Route path="/interpretation/:id" element={<Interpretation />} /> */}
              {/* <Route path="/social" element={<Social />} /> */}
              {/* <Route path="/profile" element={<Profile />} /> */}
              {/* <Route path="/istikhara" element={<IstkharaPage />} /> */}
              {/* <Route path="/azkar" element={<AzkarPage />} /> */}
              {/* <Route path="/sleep" element={<SleepPage />} /> */}
            </Routes>
          </Layout>
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
      </Router>
    </QueryClientProvider>
  )
}

export default App
