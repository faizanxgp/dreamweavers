import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/useAuth'
import { Button, Input, Card, CardBody } from '@components/ui'
import { loginSchema } from '@utils/validation'
import { LoginCredentials } from '@/types'
import { Moon } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true)
    try {
      await login(data)
      toast.success('Welcome back!')
      navigate('/journal')
    } catch (error) {
      toast.error('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-islamic-green-50 via-white to-islamic-teal-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-islamic-green-500 to-islamic-teal-500 rounded-2xl shadow-lg mb-4">
            <Moon className="text-white h-8 w-8" />
          </div>
          <h1 className="text-3xl font-display text-islamic-green-700 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue your dream journey</p>
        </div>

        <Card variant="elevated">
          <CardBody className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                error={errors.email?.message}
                {...register('email')}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-islamic-green-600 focus:ring-islamic-green-500" />
                  <span className="ml-2 text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-islamic-green-600 hover:text-islamic-green-700">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-islamic-green-600 hover:text-islamic-green-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>

        <p className="text-center text-xs text-gray-500 mt-8">
          By signing in, you agree to our{' '}
          <a href="/terms" className="text-islamic-green-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-islamic-green-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
