import { Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { Button } from '@components/ui'
import { Moon, Menu, X, User, LogOut, BookOpen, Users, Moon as MoonIcon, Heart } from 'lucide-react'
import { useState } from 'react'
import { useIsMobile } from '@hooks'

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  const navigation = [
    { name: 'Journal', href: '/journal', icon: BookOpen },
    { name: 'Community', href: '/social', icon: Users },
    { name: 'Istikhara', href: '/istikhara', icon: MoonIcon },
    { name: 'Azkar', href: '/azkar', icon: Heart },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-islamic-green-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-islamic-green-500 to-islamic-teal-500 rounded-lg flex items-center justify-center shadow-lg">
              <Moon className="text-white h-6 w-6" />
            </div>
            <span className="text-2xl font-display text-islamic-green-700 hidden sm:block">
              Dream Interpreter
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && !isMobile && (
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-islamic-green-50 hover:text-islamic-green-700 transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {user?.username}
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                </Button>

                {/* Mobile Menu Button */}
                {isMobile && (
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                  >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                )}
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isAuthenticated && isMobile && isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3">
            <nav className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-islamic-green-50 hover:text-islamic-green-700 transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
