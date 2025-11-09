/**
 * AzkarList Component
 * Displays a list of Azkar with category filtering
 */
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { azkarAPI } from '@/services/api'
import { AzkarListResponse } from '@/types/azkar'
import AzkarCard from './AzkarCard'
import toast from 'react-hot-toast'

const categories = [
  { value: '', label: 'All' },
  { value: 'night', label: 'Night' },
  { value: 'sleep', label: 'Sleep' },
  { value: 'morning', label: 'Morning' },
  { value: 'evening', label: 'Evening' },
]

export default function AzkarList() {
  const [selectedCategory, setSelectedCategory] = useState('')

  const { data, isLoading, error } = useQuery<AzkarListResponse>({
    queryKey: ['azkar', selectedCategory],
    queryFn: async () => {
      const response = await azkarAPI.getAllAzkar(selectedCategory || undefined)
      return response.data
    },
    onError: () => {
      toast.error('Failed to load Azkar. Please try again.')
    }
  })

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category.value
                ? 'bg-islamic-green-600 text-white'
                : 'bg-white text-islamic-green-700 hover:bg-islamic-green-50 border border-islamic-green-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-green-600"></div>
          <p className="mt-4 text-gray-600">Loading Azkar...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-600">Failed to load Azkar. Please try again.</p>
        </div>
      )}

      {/* Azkar List */}
      {data && (
        <div>
          <div className="mb-4 text-sm text-gray-600">
            Showing {data.azkar.length} {selectedCategory || 'total'} supplications
          </div>
          <div className="space-y-4">
            {data.azkar.map((azkar, index) => (
              <AzkarCard key={azkar.id} azkar={azkar} index={index} />
            ))}
          </div>
          {data.azkar.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No Azkar found for this category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
