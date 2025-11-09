import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, EmptyState, Loading } from '@components/ui'
import { DreamCard } from '@components/Dream'
import { Plus, BookOpen, Filter } from 'lucide-react'
import { Dream } from '@/types'

export default function DreamJournalPage() {
  // TODO: Replace with actual API call
  const [dreams] = useState<Dream[]>([])
  const [isLoading] = useState(false)

  if (isLoading) {
    return <Loading text="Loading your dreams..." />
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Dream Journal</h1>
          <p className="text-gray-600">Your personal collection of dreams and interpretations</p>
        </div>
        <Link to="/dream/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Dream
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            All Dreams
          </Button>
          <Button variant="ghost" size="sm">
            Istikhara
          </Button>
          <Button variant="ghost" size="sm">
            This Month
          </Button>
          <Button variant="ghost" size="sm">
            Interpreted
          </Button>
        </div>
      </div>

      {/* Dreams List */}
      {dreams.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No dreams yet"
          description="Start your dream journal by recording your first dream"
          action={{
            label: 'Record Your First Dream',
            onClick: () => window.location.href = '/dream/new',
          }}
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
