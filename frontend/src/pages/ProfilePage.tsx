import { useState } from 'react'
import { useAuth } from '@hooks/useAuth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Textarea, Card, CardBody, CardHeader } from '@components/ui'
import { profileSchema } from '@utils/validation'
import { User, Settings, BarChart3 } from 'lucide-react'
import { getInitials, getAvatarColor } from '@utils'
import toast from 'react-hot-toast'

type ProfileFormData = {
  username: string
  full_name?: string
  bio?: string
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || '',
      full_name: user?.full_name || '',
      bio: user?.bio || '',
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true)
    try {
      // TODO: API call to update profile
      console.log('Update profile:', data)
      if (user) {
        updateUser({ ...user, ...data })
      }
      toast.success('Profile updated successfully')
      setIsEditing(false)
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Avatar */}
          <Card>
            <CardBody className="p-6 text-center">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.username}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
              ) : (
                <div className={`w-24 h-24 rounded-full mx-auto mb-4 ${getAvatarColor(user.id)} flex items-center justify-center text-white text-3xl font-bold`}>
                  {getInitials(user.username)}
                </div>
              )}
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {user.full_name || user.username}
              </h2>
              <p className="text-gray-600 text-sm mb-4">@{user.username}</p>
              {user.is_verified && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Verified
                </span>
              )}
            </CardBody>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Statistics</h3>
              </div>
            </CardHeader>
            <CardBody className="p-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Dreams</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Interpretations</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Community Posts</span>
                <span className="font-semibold">0</span>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Profile Information</h3>
                </div>
                {!isEditing && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardBody className="p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    label="Username"
                    placeholder="username"
                    error={errors.username?.message}
                    {...register('username')}
                  />

                  <Input
                    label="Full Name"
                    placeholder="Your full name"
                    error={errors.full_name?.message}
                    {...register('full_name')}
                  />

                  <Textarea
                    label="Bio"
                    placeholder="Tell us about yourself..."
                    rows={4}
                    error={errors.bio?.message}
                    {...register('bio')}
                  />

                  <div className="flex gap-3 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" isLoading={isSaving}>
                      Save Changes
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                    <p className="text-gray-900">@{user.username}</p>
                  </div>
                  {user.full_name && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                      <p className="text-gray-900">{user.full_name}</p>
                    </div>
                  )}
                  {user.bio && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Bio</label>
                      <p className="text-gray-900">{user.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </CardBody>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Settings</h3>
              </div>
            </CardHeader>
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive interpretation updates via email</p>
                </div>
                <input type="checkbox" className="rounded border-gray-300 text-islamic-green-600 focus:ring-islamic-green-500" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Public Profile</p>
                  <p className="text-sm text-gray-600">Allow others to view your profile</p>
                </div>
                <input type="checkbox" className="rounded border-gray-300 text-islamic-green-600 focus:ring-islamic-green-500" />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button variant="danger" size="sm">
                  Delete Account
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
