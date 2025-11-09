import { Dream } from '@/types'
import { Card, CardBody, Badge } from '@components/ui'
import { Calendar, Heart, MessageCircle, Lock, Globe } from 'lucide-react'
import { formatRelativeDate, getMoodEmoji, truncate } from '@utils'
import { Link } from 'react-router-dom'

interface DreamCardProps {
  dream: Dream
  onClick?: () => void
}

export function DreamCard({ dream, onClick }: DreamCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <CardBody>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {dream.title}
              </h3>
              {dream.mood && (
                <span className="text-xl" title={dream.mood}>
                  {getMoodEmoji(dream.mood)}
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">{truncate(dream.content, 150)}</p>
          </div>
          {dream.is_public ? (
            <Globe className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
          ) : (
            <Lock className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
          )}
        </div>

        {dream.tags && dream.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {dream.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
            {dream.tags.length > 3 && (
              <Badge variant="default">+{dream.tags.length - 3}</Badge>
            )}
          </div>
        )}

        {dream.is_istikhara && (
          <Badge variant="info" className="mb-3">
            Istikhara Dream
          </Badge>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatRelativeDate(dream.dream_date)}</span>
          </div>

          <div className="flex items-center gap-4">
            {dream.interpretations && dream.interpretations.length > 0 && (
              <span className="text-islamic-green-600 font-medium">
                {dream.interpretations.length} interpretation{dream.interpretations.length > 1 ? 's' : ''}
              </span>
            )}
            <div className="flex items-center gap-1">
              <Heart className={`h-4 w-4 ${dream.is_liked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{dream.likes_count || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{dream.comments_count || 0}</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
