import { Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { Button, Card, CardBody } from '@components/ui'
import { Moon, Brain, Users, BookOpen, Heart, Sparkles, Shield, Clock } from 'lucide-react'

export default function HomePage() {
  const { isAuthenticated } = useAuth()

  const features = [
    {
      icon: Brain,
      title: 'AI Dream Interpretation',
      description: 'Get instant interpretations using our fine-tuned Islamic AI model',
    },
    {
      icon: Users,
      title: 'Imam Consultation',
      description: 'Request interpretation from certified Islamic scholars',
    },
    {
      icon: BookOpen,
      title: 'Dream Journal',
      description: 'Keep a secure, private journal of all your dreams',
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'Share dreams and connect with fellow Muslims',
    },
    {
      icon: Moon,
      title: 'Istikhara Dreams',
      description: 'Specialized interpretation for Istikhara prayers',
    },
    {
      icon: Sparkles,
      title: 'Night Azkar',
      description: 'Guided prayers and remembrance before sleep',
    },
    {
      icon: Shield,
      title: 'Islamic Wisdom',
      description: 'Based on authentic Islamic dream symbolism',
    },
    {
      icon: Clock,
      title: 'Sleep Tracking',
      description: 'Monitor and improve your sleep quality',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-islamic-green-500 via-islamic-teal-500 to-islamic-green-600 text-white">
        <div className="absolute inset-0 bg-[url('/islamic-pattern.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl shadow-2xl mb-8 backdrop-blur-sm">
              <Moon className="h-12 w-12" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Islamic Dream Interpretation
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Understand your dreams through Islamic wisdom combined with modern AI technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <>
                  <Link to="/journal">
                    <Button size="lg" variant="secondary" className="bg-white text-islamic-green-700 hover:bg-gray-100">
                      Go to Journal
                    </Button>
                  </Link>
                  <Link to="/dream/new">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Record a Dream
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" variant="secondary" className="bg-white text-islamic-green-700 hover:bg-gray-100">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive platform for understanding and interpreting your dreams through an Islamic lens
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} variant="bordered" className="hover:shadow-lg transition-shadow">
                <CardBody className="p-6">
                  <div className="w-12 h-12 bg-islamic-green-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-islamic-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">Simple steps to understand your dreams</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-islamic-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Record Your Dream</h3>
              <p className="text-gray-600">
                Write down your dream in detail, including emotions, symbols, and context
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-islamic-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Interpretation</h3>
              <p className="text-gray-600">
                Receive instant AI interpretation or request guidance from an Islamic scholar
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-islamic-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track & Learn</h3>
              <p className="text-gray-600">
                Build your dream journal and discover patterns in your spiritual journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 bg-islamic-green-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Begin Your Journey Today
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of Muslims understanding their dreams through Islamic wisdom
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="bg-white text-islamic-green-700 hover:bg-gray-100">
                Create Free Account
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
