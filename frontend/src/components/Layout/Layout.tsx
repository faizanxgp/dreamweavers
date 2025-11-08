import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Header - to be implemented */}
      <header className="bg-white shadow-sm border-b border-islamic-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-islamic-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">☪</span>
              </div>
              <h1 className="text-2xl font-display text-islamic-green-700">
                Dream Interpreter
              </h1>
            </div>
            {/* Navigation - to be implemented */}
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
