import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, Badge, Loading } from '@components/ui'
import { InterpretationCard } from '@components/Dream'
import { CommentList, CommentForm } from '@components/Social'
import { Calendar, Lock, Globe, Heart, MessageCircle, ArrowLeft, Brain, User, Sparkles } from 'lucide-react'
import { formatRelativeDate, getMoodEmoji } from '@utils'
import { Dream, Comment as CommentType } from '@/types'

export default function InterpretationPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // TODO: Replace with actual API calls
  const [dream] = useState<Dream | null>(null)
  const [comments] = useState<CommentType[]>([])
  const [isLoading] = useState(false)
  const [requestingInterpretation, setRequestingInterpretation] = useState(false)

  const handleRequestInterpretation = async (type: 'ai' | 'imam') => {
    setRequestingInterpretation(true)
    try {
      // TODO: API call to request interpretation
      console.log('Requesting interpretation:', type)
    } finally {
      setRequestingInterpretation(false)
    }
  }

  const handleLike = async () => {
    // TODO: API call to like dream
  }

  const handleCommentSubmit = async (content: string) => {
    // TODO: API call to post comment
    console.log('Comment:', content)
  }

  if (isLoading) {
    return <Loading text="Loading dream..." />
  }

  if (!dream) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Dream not found</h2>
        <Button onClick={() => navigate('/journal')}>Back to Journal</Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate('/journal')} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Journal
      </Button>

      {/* Dream Details */}
      <Card className="mb-6">
        <CardBody className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl font-bold text-gray-900">{dream.title}</h1>
                {dream.mood && (
                  <span className="text-2xl" title={dream.mood}>
                    {getMoodEmoji(dream.mood)}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatRelativeDate(dream.dream_date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  {dream.is_public ? (
                    <>
                      <Globe className="h-4 w-4" />
                      <span>Public</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      <span>Private</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {dream.is_istikhara && (
            <Badge variant="info" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              Istikhara Dream
            </Badge>
          )}

          <div className="prose prose-lg max-w-none mb-6">
            <p className="text-gray-700 whitespace-pre-wrap">{dream.content}</p>
          </div>

          {dream.tags && dream.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {dream.tags.map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <Heart className={`h-5 w-5 ${dream.is_liked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{dream.likes_count || 0} likes</span>
            </button>
            <div className="flex items-center gap-2 text-gray-600">
              <MessageCircle className="h-5 w-5" />
              <span>{dream.comments_count || 0} comments</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Interpretations */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Interpretations</h2>

        {!dream.interpretations || dream.interpretations.length === 0 ? (
          <Card variant="bordered">
            <CardBody className="p-8 text-center">
              <p className="text-gray-600 mb-6">No interpretations yet. Request one to get started!</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => handleRequestInterpretation('ai')}
                  isLoading={requestingInterpretation}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Get AI Interpretation
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleRequestInterpretation('imam')}
                  isLoading={requestingInterpretation}
                >
                  <User className="h-4 w-4 mr-2" />
                  Request Imam Consultation
                </Button>
              </div>
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-4">
            {dream.interpretations.map((interpretation) => (
              <InterpretationCard key={interpretation.id} interpretation={interpretation} />
            ))}
          </div>
        )}
      </div>

      {/* Comments */}
      {dream.is_public && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Comments</h2>
          <Card className="mb-4">
            <CardBody className="p-6">
              <CommentForm onSubmit={handleCommentSubmit} />
            </CardBody>
          </Card>
          <CommentList comments={comments} />
        </div>
      )}
    </div>
  )
}
