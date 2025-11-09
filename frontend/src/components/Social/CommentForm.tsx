import { useState } from 'react'
import { Button, Textarea } from '@components/ui'
import { Send } from 'lucide-react'

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>
  placeholder?: string
}

export function CommentForm({ onSubmit, placeholder = 'Write a comment...' }: CommentFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(content)
      setContent('')
    } catch (error) {
      console.error('Failed to submit comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={3}
        disabled={isSubmitting}
      />
      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting} disabled={!content.trim()}>
          <Send className="h-4 w-4 mr-2" />
          Post Comment
        </Button>
      </div>
    </form>
  )
}
