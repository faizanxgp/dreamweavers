/**
 * Azkar Page
 * Display Islamic supplications and Quranic verses
 */
import { motion } from 'framer-motion'
import AzkarList from '@/components/Azkar/AzkarList'

export default function AzkarPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-display text-islamic-green-700 mb-3">
          Azkar - Islamic Supplications
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Authentic supplications from the Quran and Hadith for protection, guidance, and blessings
        </p>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 mb-8 bg-islamic-green-50 border-l-4 border-islamic-green-600"
      >
        <h2 className="text-xl font-semibold text-islamic-green-800 mb-2">
          About Azkar
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Azkar (أذكار) are remembrances and supplications taught by Prophet Muhammad (peace be upon him).
          Reciting these before sleep provides spiritual protection, peace of mind, and increases the
          likelihood of good dreams. Each supplication comes with its authentic reference from the
          Quran or Hadith collections.
        </p>
      </motion.div>

      {/* Azkar List */}
      <AzkarList />

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center text-sm text-gray-500"
      >
        <p>
          All supplications are from authentic Islamic sources.
          May Allah accept our remembrance and grant us beneficial knowledge.
        </p>
      </motion.div>
    </div>
  )
}
