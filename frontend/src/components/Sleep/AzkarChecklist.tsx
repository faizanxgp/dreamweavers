/**
 * AzkarChecklist Component
 * Interactive checklist for bedtime Azkar
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { AzkarChecklistItem } from '@/types/sleep'

interface AzkarChecklistProps {
  items: AzkarChecklistItem[]
}

export default function AzkarChecklist({ items }: AzkarChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())

  const toggleItem = (order: number) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(order)) {
      newChecked.delete(order)
    } else {
      newChecked.add(order)
    }
    setCheckedItems(newChecked)
  }

  const progress = (checkedItems.size / items.length) * 100

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress: {checkedItems.size} / {items.length}
          </span>
          <span className="text-sm font-medium text-islamic-green-700">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-islamic-green-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <motion.div
            key={item.order}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: item.order * 0.05 }}
            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
              checkedItems.has(item.order)
                ? 'border-islamic-green-500 bg-islamic-green-50'
                : 'border-gray-200 bg-white hover:border-islamic-green-300'
            }`}
            onClick={() => toggleItem(item.order)}
          >
            <div className="flex items-start">
              {/* Checkbox */}
              <div className="flex-shrink-0 mr-3 mt-1">
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    checkedItems.has(item.order)
                      ? 'border-islamic-green-600 bg-islamic-green-600'
                      : 'border-gray-300'
                  }`}
                >
                  {checkedItems.has(item.order) && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-800">{item.item}</h3>
                  <span className="text-xs px-2 py-1 rounded bg-islamic-gold-100 text-islamic-gold-800">
                    {item.importance}
                  </span>
                </div>

                {item.translation && (
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Translation:</span> {item.translation}
                  </p>
                )}

                {item.benefit && (
                  <p className="text-sm text-islamic-green-700 mb-1">
                    <span className="font-medium">Benefit:</span> {item.benefit}
                  </p>
                )}

                {item.method && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Method:</span> {item.method}
                  </p>
                )}

                {item.note && (
                  <p className="text-xs text-gray-500 italic mt-1">{item.note}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Completion Message */}
      {checkedItems.size === items.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-islamic-green-100 border-2 border-islamic-green-500 rounded-lg text-center"
        >
          <p className="text-islamic-green-800 font-semibold">
            Masha'Allah! You've completed all bedtime Azkar. May Allah protect you tonight.
          </p>
        </motion.div>
      )}
    </div>
  )
}
