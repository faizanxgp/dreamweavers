/**
 * SleepGuidanceCard Component
 * Displays sleep guidance information
 */
import { motion } from 'framer-motion'

interface SleepGuidanceCardProps {
  title: string
  children: React.ReactNode
  icon?: string
  delay?: number
}

export default function SleepGuidanceCard({
  title,
  children,
  icon = '🌙',
  delay = 0
}: SleepGuidanceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card p-6 bg-white"
    >
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{icon}</span>
        <h2 className="text-2xl font-display text-islamic-green-700">{title}</h2>
      </div>
      <div className="text-gray-700">{children}</div>
    </motion.div>
  )
}
