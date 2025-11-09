import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardHeader, Button, EmptyState } from '@components/ui'
import { DreamCard } from '@components/Dream'
import { Sparkles, BookOpen, Plus } from 'lucide-react'
import { Dream } from '@/types'

export default function IstkharaPage() {
  // TODO: Replace with actual API call
  const [istkharaDreams] = useState<Dream[]>([])

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-islamic-teal-600" />
            Istikhara Dreams
          </h1>
          <p className="text-gray-600">
            Special interpretations for dreams received after Istikhara prayer
          </p>
        </div>
        <Link to="/dream/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Record Istikhara Dream
          </Button>
        </Link>
      </div>

      {/* Information Card */}
      <Card className="mb-8 bg-gradient-to-r from-islamic-teal-50 to-islamic-green-50">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">About Istikhara</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <p className="text-gray-700">
            Istikhara is a prayer for guidance when making important decisions. Dreams that occur
            after performing Istikhara may contain divine guidance regarding the matter you consulted about.
          </p>

          <div className="bg-white rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-gray-900">The Istikhara Prayer:</h4>
            <p className="text-sm text-gray-700 leading-relaxed" dir="rtl" lang="ar">
              اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ...
            </p>
            <p className="text-sm text-gray-600 italic">
              "O Allah, I seek Your guidance through Your knowledge, and I seek ability through Your power,
              and I ask You of Your great bounty..."
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Interpreting Istikhara Dreams:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>Dreams after Istikhara may be direct or symbolic</li>
              <li>Positive feelings in the dream may indicate approval</li>
              <li>Negative feelings may indicate you should reconsider</li>
              <li>Consult with a knowledgeable Islamic scholar for clarity</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Not seeing a dream doesn't mean your prayer wasn't answered.
              Allah guides in many ways - through ease in the matter, advice from others, or feelings in your heart.
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Dreams List */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Istikhara Dreams</h2>

        {istkharaDreams.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No Istikhara dreams recorded"
            description="Record your dreams after performing Istikhara prayer to receive specialized interpretation"
            action={{
              label: 'Record First Istikhara Dream',
              onClick: () => window.location.href = '/dream/new',
            }}
          />
        ) : (
          <div className="space-y-4">
            {istkharaDreams.map((dream) => (
              <Link key={dream.id} to={`/dream/${dream.id}`}>
                <DreamCard dream={dream} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
