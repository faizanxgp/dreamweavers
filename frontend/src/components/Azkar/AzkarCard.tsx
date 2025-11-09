/**
 * AzkarCard Component
 * Displays an individual Azkar (Islamic supplication)
 */
import { motion } from 'framer-motion'
import { Azkar } from '@/types/azkar'

interface AzkarCardProps {
  azkar: Azkar
  index: number
}

export default function AzkarCard({ azkar, index }: AzkarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card p-6 bg-white hover:shadow-lg transition-shadow duration-300"
    >
      {/* Arabic Text */}
      <div className="mb-4 text-right" dir="rtl">
        <p className="text-2xl font-arabic leading-loose text-islamic-green-700">
          {azkar.arabic_text}
        </p>
      </div>

      {/* Transliteration */}
      {azkar.transliteration && (
        <div className="mb-3 text-sm italic text-gray-600">
          <p>{azkar.transliteration}</p>
        </div>
      )}

      {/* Translation */}
      <div className="mb-4 text-gray-700">
        <p className="leading-relaxed">{azkar.translation}</p>
      </div>

      {/* Reference */}
      {azkar.reference && (
        <div className="flex items-center justify-between text-sm">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-islamic-green-100 text-islamic-green-800 font-medium">
            {azkar.category}
          </span>
          <span className="text-gray-500">
            <span className="font-semibold">Reference:</span> {azkar.reference}
          </span>
        </div>
      )}
    </motion.div>
  )
}
