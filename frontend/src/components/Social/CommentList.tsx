import { Comment as CommentType } from '@/types'
import { Card, CardBody } from '@components/ui'
import { Heart } from 'lucide-react'
import { formatRelativeDate, getInitials, getAvatarColor } from '@utils'

interface CommentListProps {
  comments: CommentType[]
  onLike?: (commentId: string) => void
}

export function CommentList({ comments, onLike }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <Card key={comment.id} variant="bordered">
          <CardBody className="py-3">
            <div className="flex items-start gap-3">
              {comment.user?.avatar_url ? (
                <img
                  src={comment.user.avatar_url}
                  alt={comment.user.username}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className={`w-8 h-8 rounded-full ${getAvatarColor(comment.user_id)} flex items-center justify-center text-white text-sm font-medium`}>
                  {getInitials(comment.user?.username || 'U')}
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-gray-900">
                    {comment.user?.full_name || comment.user?.username || 'Anonymous'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatRelativeDate(comment.created_at)}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{comment.content}</p>

                <button
                  onClick={() => onLike?.(comment.id)}
                  className="flex items-center gap-1 mt-2 text-xs text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Heart className={`h-3 w-3 ${comment.is_liked ? 'fill-red-500 text-red-500' : ''}`} />
                  <span>{comment.likes_count || 0}</span>
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
