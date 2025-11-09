import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-islamic-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-islamic-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">☪</span>
              </div>
              <h1 className="text-2xl font-display text-islamic-green-700">
                Dream Interpreter
              </h1>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <Link
                to="/azkar"
                className={`font-medium transition-colors ${
                  isActive('/azkar')
                    ? 'text-islamic-green-700 border-b-2 border-islamic-green-600'
                    : 'text-gray-600 hover:text-islamic-green-700'
                }`}
              >
                Azkar
              </Link>
              <Link
                to="/sleep"
                className={`font-medium transition-colors ${
                  isActive('/sleep')
                    ? 'text-islamic-green-700 border-b-2 border-islamic-green-600'
                    : 'text-gray-600 hover:text-islamic-green-700'
                }`}
              >
                Sleep Guidance
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer - to be implemented */}
      <footer className="bg-islamic-green-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm">
              Built with love for the Muslim community
            </p>
            <p className="text-xs mt-2 text-islamic-green-300">
              &copy; 2024 Dream Interpreter. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
