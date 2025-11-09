import { Interpretation } from '@/types'
import { Card, CardBody, Badge } from '@components/ui'
import { Bot, User as UserIcon, Users, Heart, ThumbsUp } from 'lucide-react'
import { formatRelativeDate } from '@utils'

interface InterpretationCardProps {
  interpretation: Interpretation
}

export function InterpretationCard({ interpretation }: InterpretationCardProps) {
  const getIcon = () => {
    switch (interpretation.interpretation_type) {
      case 'ai':
        return <Bot className="h-5 w-5 text-islamic-green-600" />
      case 'imam':
        return <UserIcon className="h-5 w-5 text-islamic-teal-600" />
      case 'community':
        return <Users className="h-5 w-5 text-blue-600" />
    }
  }

  const getTypeLabel = () => {
    switch (interpretation.interpretation_type) {
      case 'ai':
        return 'AI Interpretation'
      case 'imam':
        return 'Imam Interpretation'
      case 'community':
        return 'Community Interpretation'
    }
  }

  const getStatusColor = () => {
    switch (interpretation.status) {
      case 'completed':
        return 'success'
      case 'in_progress':
        return 'warning'
      case 'pending':
        return 'info'
      case 'rejected':
        return 'danger'
      default:
        return 'default'
    }
  }

  return (
    <Card variant="bordered">
      <CardBody>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">{getIcon()}</div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-gray-900">{getTypeLabel()}</span>
              <Badge variant={getStatusColor() as any}>{interpretation.status}</Badge>
              {interpretation.confidence_score && (
                <span className="text-sm text-gray-500">
                  {Math.round(interpretation.confidence_score * 100)}% confidence
                </span>
              )}
            </div>

            {interpretation.interpreter && (
              <div className="text-sm text-gray-600 mb-2">
                by {interpretation.interpreter.full_name || interpretation.interpreter.username}
              </div>
            )}

            <div className="prose prose-sm max-w-none mb-3">
              <p className="text-gray-700 whitespace-pre-wrap">{interpretation.content}</p>
            </div>

            {interpretation.references && interpretation.references.length > 0 && (
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 mb-1">References:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {interpretation.references.map((ref, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{ref}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {interpretation.tags && interpretation.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {interpretation.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{formatRelativeDate(interpretation.created_at)}</span>
              <div className="flex items-center gap-1">
                <button className="flex items-center gap-1 hover:text-islamic-green-600 transition-colors">
                  <Heart className={`h-4 w-4 ${interpretation.is_liked ? 'fill-red-500 text-red-500' : ''}`} />
                  <span>{interpretation.likes_count || 0}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
