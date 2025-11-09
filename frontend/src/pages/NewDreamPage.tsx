import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Textarea, Card, CardBody } from '@components/ui'
import { dreamSchema } from '@utils/validation'
import { CreateDreamData } from '@/types'
import { Save, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

export default function NewDreamPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<CreateDreamData>({
    resolver: zodResolver(dreamSchema),
    defaultValues: {
      dream_date: new Date().toISOString().split('T')[0],
      is_istikhara: false,
      is_public: false,
    },
  })

  const isIstikhara = watch('is_istikhara')

  const onSubmit = async (data: CreateDreamData) => {
    setIsSubmitting(true)
    try {
      // TODO: Replace with actual API call
      // await api.post('/dreams', data)
      console.log('Dream data:', data)
      toast.success('Dream recorded successfully!')
      navigate('/journal')
    } catch (error) {
      toast.error('Failed to save dream')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Record a Dream</h1>
        <p className="text-gray-600">
          Write down your dream in detail. The more details you provide, the better the interpretation.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardBody className="p-6 space-y-6">
            {/* Title */}
            <Input
              label="Dream Title"
              placeholder="Give your dream a title"
              error={errors.title?.message}
              {...register('title')}
            />

            {/* Date */}
            <Input
              label="Dream Date"
              type="date"
              error={errors.dream_date?.message}
              {...register('dream_date')}
            />

            {/* Content */}
            <Textarea
              label="Dream Description"
              placeholder="Describe your dream in detail... Include people, places, emotions, colors, and any symbols you remember."
              rows={10}
              error={errors.content?.message}
              {...register('content')}
            />

            {/* Mood */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How did this dream make you feel?
              </label>
              <div className="flex gap-3">
                {[
                  { value: 'positive', label: '😊 Positive', color: 'border-green-500' },
                  { value: 'negative', label: '😔 Negative', color: 'border-red-500' },
                  { value: 'neutral', label: '😐 Neutral', color: 'border-gray-500' },
                  { value: 'mixed', label: '🤔 Mixed', color: 'border-yellow-500' },
                ].map((mood) => (
                  <label
                    key={mood.value}
                    className="flex-1 cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={mood.value}
                      {...register('mood')}
                      className="sr-only peer"
                    />
                    <div className={`border-2 rounded-lg p-3 text-center transition-all peer-checked:${mood.color} peer-checked:bg-gray-50`}>
                      <span className="text-sm font-medium">{mood.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Istikhara */}
            <div className="flex items-center gap-3 p-4 bg-islamic-teal-50 border border-islamic-teal-200 rounded-lg">
              <input
                type="checkbox"
                id="is_istikhara"
                {...register('is_istikhara')}
                className="rounded border-gray-300 text-islamic-teal-600 focus:ring-islamic-teal-500"
              />
              <label htmlFor="is_istikhara" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-islamic-teal-600" />
                  <span className="font-medium text-gray-900">This is an Istikhara dream</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Mark this if you had this dream after performing Istikhara prayer
                </p>
              </label>
            </div>

            {isIstikhara && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Istikhara dreams</strong> will be interpreted with special attention to guidance
                  from Allah regarding the matter you consulted about.
                </p>
              </div>
            )}

            {/* Privacy */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_public"
                {...register('is_public')}
                className="rounded border-gray-300 text-islamic-green-600 focus:ring-islamic-green-500"
              />
              <label htmlFor="is_public" className="cursor-pointer">
                <span className="font-medium text-gray-900">Share with community</span>
                <p className="text-sm text-gray-600">
                  Allow others to see and comment on this dream
                </p>
              </label>
            </div>
          </CardBody>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/journal')}
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            <Save className="h-4 w-4 mr-2" />
            Save Dream
          </Button>
        </div>
      </form>
    </div>
  )
}
