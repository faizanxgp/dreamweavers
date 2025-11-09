import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/useAuth'
import { Button, Input, Card, CardBody } from '@components/ui'
import { signupSchema } from '@utils/validation'
import { SignupData } from '@/types'
import { Moon } from 'lucide-react'
import toast from 'react-hot-toast'

type SignupFormData = SignupData & { confirm_password: string }

export default function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    try {
      const { confirm_password, ...signupData } = data
      await signup(signupData)
      toast.success('Account created successfully!')
      navigate('/journal')
    } catch (error) {
      toast.error('Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-islamic-green-50 via-white to-islamic-teal-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-islamic-green-500 to-islamic-teal-500 rounded-2xl shadow-lg mb-4">
            <Moon className="text-white h-8 w-8" />
          </div>
          <h1 className="text-3xl font-display text-islamic-green-700 mb-2">Create Account</h1>
          <p className="text-gray-600">Start your dream interpretation journey</p>
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
                label="Username"
                type="text"
                placeholder="username"
                error={errors.username?.message}
                {...register('username')}
              />

              <Input
                label="Full Name"
                type="text"
                placeholder="Your full name (optional)"
                error={errors.full_name?.message}
                {...register('full_name')}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                helperText="Must be at least 8 characters with uppercase, lowercase, and number"
                error={errors.password?.message}
                {...register('password')}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                error={errors.confirm_password?.message}
                {...register('confirm_password')}
              />

              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="mt-1 rounded border-gray-300 text-islamic-green-600 focus:ring-islamic-green-500"
                />
                <label className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="/terms" className="text-islamic-green-600 hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-islamic-green-600 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-islamic-green-600 hover:text-islamic-green-700 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
