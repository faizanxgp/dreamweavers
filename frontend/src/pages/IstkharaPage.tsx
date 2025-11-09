import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { istkharaAPI } from '../services/api'
import IstikharaForm from '../components/Istikhara/IstikharaForm'
import IstikharaInterpretation from '../components/Istikhara/IstikharaInterpretation'

interface IstikharaDream {
  title: string
  description: string
  istikhara_decision: string
  emotions?: string[]
  symbols?: string[]
  colors?: string[]
  people?: string[]
  dream_date?: string
  time_of_day?: string
  privacy?: string
}

const IstkharaPage = () => {
  const [interpretation, setInterpretation] = useState<any>(null)
  const navigate = useNavigate()

  const submitMutation = useMutation({
    mutationFn: (data: IstikharaDream) => istkharaAPI.submitIstikharaDream(data),
    onSuccess: (response) => {
      toast.success('Istikhara dream submitted successfully!')
      setInterpretation(response.data)
    },
    onError: (error: any) => {
      console.error('Error submitting Istikhara dream:', error)
      toast.error(error.response?.data?.detail || 'Failed to submit dream')
    },
  })

  const handleSubmit = (data: IstikharaDream) => {
    submitMutation.mutate(data)
  }

  const handleReset = () => {
    setInterpretation(null)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-display text-islamic-green-700 mb-3">
          Istikhara Dream Interpretation
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Submit your dream seen after performing Salat al-Istikhara to receive guidance
        </p>
      </div>

      {/* Information Card */}
      <div className="bg-islamic-teal-50 border border-islamic-teal-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-islamic-teal-800 mb-3">
          About Istikhara Dreams
        </h2>
        <div className="text-gray-700 space-y-2">
          <p>
            Istikhara (استخارة) is a prayer for seeking Allah's guidance when making important decisions.
            Dreams seen after performing Istikhara may provide insights, though they should be considered
            alongside consultation with knowledgeable people and careful reflection.
          </p>
          <p className="text-sm italic mt-3 text-islamic-teal-700">
            "Not all dreams after Istikhara are divine guidance. Please consult with scholars for important matters."
          </p>
        </div>
      </div>

      {/* Main Content */}
      {!interpretation ? (
        <IstikharaForm
          onSubmit={handleSubmit}
          isLoading={submitMutation.isPending}
        />
      ) : (
        <IstikharaInterpretation
          interpretation={interpretation}
          onReset={handleReset}
        />
      )}
    </div>
  )
}

export default IstkharaPage
