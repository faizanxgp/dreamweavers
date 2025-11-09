import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EmptyState, Loading, Button } from '@components/ui'
import { DreamCard } from '@components/Dream'
import { Users, TrendingUp, Clock } from 'lucide-react'
import { Dream } from '@/types'

export default function SocialPage() {
  // TODO: Replace with actual API calls
  const [dreams] = useState<Dream[]>([])
  const [isLoading] = useState(false)
  const [filter, setFilter] = useState<'recent' | 'trending'>('recent')

  if (isLoading) {
    return <Loading text="Loading community dreams..." />
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Community</h1>
        <p className="text-gray-600">Explore and discuss dreams shared by the community</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex gap-3">
          <Button
            variant={filter === 'recent' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('recent')}
          >
            <Clock className="h-4 w-4 mr-2" />
            Recent
          </Button>
          <Button
            variant={filter === 'trending' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('trending')}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Trending
          </Button>
        </div>
      </div>

      {/* Dreams Feed */}
      {dreams.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No public dreams yet"
          description="Be the first to share your dream with the community"
        />
      ) : (
        <div className="space-y-4">
          {dreams.map((dream) => (
            <Link key={dream.id} to={`/dream/${dream.id}`}>
              <DreamCard dream={dream} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
