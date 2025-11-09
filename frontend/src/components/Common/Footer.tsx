import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-islamic-green-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Dream Interpreter</h3>
            <p className="text-sm text-islamic-green-200">
              Islamic dream interpretation platform combining traditional wisdom with modern technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-islamic-green-200">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-islamic-green-200">
              <li>
                <a href="/symbols" className="hover:text-white transition-colors">
                  Dream Symbols
                </a>
              </li>
              <li>
                <a href="/azkar" className="hover:text-white transition-colors">
                  Night Azkar
                </a>
              </li>
              <li>
                <a href="/guides" className="hover:text-white transition-colors">
                  Islamic Guidance
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-islamic-green-800 mt-8 pt-8 text-center">
          <p className="text-sm flex items-center justify-center gap-2">
            Built with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> for the Muslim community
          </p>
          <p className="text-xs mt-2 text-islamic-green-300">
            &copy; {new Date().getFullYear()} Dream Interpreter. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
