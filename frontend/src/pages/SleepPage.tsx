import { useState } from 'react'
import { Card, CardBody, CardHeader, Button, Input, EmptyState } from '@components/ui'
import { Moon, Plus, TrendingUp, Clock, Calendar } from 'lucide-react'
import { SleepEntry } from '@/types'
import { formatDate, formatSleepQuality } from '@utils'

export default function SleepPage() {
  const [sleepEntries] = useState<SleepEntry[]>([])
  const [showAddEntry, setShowAddEntry] = useState(false)

  // Calculate stats
  const avgDuration = sleepEntries.length > 0
    ? sleepEntries.reduce((sum, entry) => sum + entry.sleep_duration, 0) / sleepEntries.length
    : 0

  const avgQuality = sleepEntries.length > 0
    ? sleepEntries.reduce((sum, entry) => sum + entry.sleep_quality, 0) / sleepEntries.length
    : 0

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Moon className="h-8 w-8 text-islamic-green-600" />
            Sleep Tracking
          </h1>
          <p className="text-gray-600">
            Monitor your sleep patterns and improve your rest quality
          </p>
        </div>
        <Button onClick={() => setShowAddEntry(!showAddEntry)}>
          <Plus className="h-4 w-4 mr-2" />
          Log Sleep
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Duration</p>
                <p className="text-2xl font-bold text-gray-900">
                  {avgDuration.toFixed(1)}h
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Quality</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatSleepQuality(avgQuality)}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Entries</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sleepEntries.length}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Add Entry Form */}
      {showAddEntry && (
        <Card className="mb-8">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Log Sleep Entry</h3>
          </CardHeader>
          <CardBody className="p-6">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Sleep Date"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
                <Input
                  label="Bedtime"
                  type="time"
                  placeholder="22:00"
                />
                <Input
                  label="Wake Time"
                  type="time"
                  placeholder="06:00"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sleep Quality (1-5)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-islamic-green-500 hover:bg-islamic-green-50 transition-colors"
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Input
                label="Notes (optional)"
                placeholder="How did you sleep? Any dreams?"
              />

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowAddEntry(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save Entry
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Sleep History */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Sleep History</h3>
        </CardHeader>
        <CardBody className="p-6">
          {sleepEntries.length === 0 ? (
            <EmptyState
              icon={Moon}
              title="No sleep entries yet"
              description="Start tracking your sleep to improve your rest quality and dream recall"
              action={{
                label: 'Log First Entry',
                onClick: () => setShowAddEntry(true),
              }}
            />
          ) : (
            <div className="space-y-3">
              {sleepEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-medium text-gray-900">
                        {formatDate(entry.sleep_date, 'PPP')}
                      </p>
                      <span className="text-sm text-gray-600">
                        {entry.bedtime} - {entry.wake_time}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{entry.sleep_duration.toFixed(1)} hours</span>
                      <span>Quality: {formatSleepQuality(entry.sleep_quality)}</span>
                      {entry.dreams_count > 0 && (
                        <span>{entry.dreams_count} dream{entry.dreams_count > 1 ? 's' : ''}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className={`w-6 h-6 rounded ${
                            star <= entry.sleep_quality
                              ? 'bg-yellow-400'
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Sleep Tips */}
      <Card className="mt-8 bg-gradient-to-r from-islamic-green-50 to-white">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Tips for Better Sleep</h3>
        </CardHeader>
        <CardBody className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-islamic-green-600 font-bold">•</span>
            <p className="text-gray-700">Maintain a consistent sleep schedule, even on weekends</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-islamic-green-600 font-bold">•</span>
            <p className="text-gray-700">Perform wudu and recite night azkar before sleeping</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-islamic-green-600 font-bold">•</span>
            <p className="text-gray-700">Avoid screens and bright lights 1 hour before bed</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-islamic-green-600 font-bold">•</span>
            <p className="text-gray-700">Keep your bedroom cool, dark, and quiet</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-islamic-green-600 font-bold">•</span>
            <p className="text-gray-700">Sleep on your right side, following the Sunnah</p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
