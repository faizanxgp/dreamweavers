/**
 * Sleep Guidance Page
 * Islamic sleep guidance, tips, and Azkar checklist
 */
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { sleepAPI } from '@/services/api'
import { SleepGuidance, IslamicSleepTimes, SleepTips, AzkarChecklist as AzkarChecklistType } from '@/types/sleep'
import SleepGuidanceCard from '@/components/Sleep/SleepGuidanceCard'
import AzkarChecklist from '@/components/Sleep/AzkarChecklist'
import toast from 'react-hot-toast'

export default function SleepPage() {
  // Fetch sleep guidance
  const { data: guidance } = useQuery<SleepGuidance>({
    queryKey: ['sleep-guidance'],
    queryFn: async () => {
      const response = await sleepAPI.getGuidance()
      return response.data
    },
    onError: () => toast.error('Failed to load sleep guidance')
  })

  // Fetch Islamic sleep times
  const { data: islamicTimes } = useQuery<IslamicSleepTimes>({
    queryKey: ['islamic-sleep-times'],
    queryFn: async () => {
      const response = await sleepAPI.getIslamicTimes()
      return response.data
    }
  })

  // Fetch sleep tips
  const { data: tips } = useQuery<SleepTips>({
    queryKey: ['sleep-tips'],
    queryFn: async () => {
      const response = await sleepAPI.getTips()
      return response.data
    }
  })

  // Fetch Azkar checklist
  const { data: azkarChecklist } = useQuery<AzkarChecklistType>({
    queryKey: ['azkar-checklist'],
    queryFn: async () => {
      const response = await sleepAPI.getAzkarChecklist()
      return response.data
    }
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-display text-islamic-green-700 mb-3">
          Islamic Sleep Guidance
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Follow the Sunnah of Prophet Muhammad (peace be upon him) for blessed sleep and spiritual protection
        </p>
      </motion.div>

      {/* Main Guidance */}
      {guidance && (
        <SleepGuidanceCard title="Sleep Guidance" icon="🌙" delay={0.1}>
          <p className="mb-4 text-lg leading-relaxed">{guidance.recommendation}</p>

          {guidance.suggested_bedtime && (
            <div className="mb-4 p-3 bg-islamic-green-50 rounded-lg">
              <p className="font-semibold text-islamic-green-800">
                Suggested Bedtime: {guidance.suggested_bedtime}
              </p>
            </div>
          )}

          {guidance.azkar_suggestions.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-islamic-green-800 mb-2">Azkar to Recite:</h3>
              <ul className="space-y-2">
                {guidance.azkar_suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-islamic-green-600 mr-2">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {guidance.tips.length > 0 && (
            <div>
              <h3 className="font-semibold text-islamic-green-800 mb-2">Tips:</h3>
              <ul className="space-y-2">
                {guidance.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-islamic-green-600 mr-2">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </SleepGuidanceCard>
      )}

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Islamic Sleep Times */}
        {islamicTimes && (
          <SleepGuidanceCard title="Islamic Sleep Times" icon="🕌" delay={0.2}>
            <div className="space-y-4">
              <div className="p-3 bg-islamic-green-50 rounded-lg">
                <h3 className="font-semibold text-islamic-green-800 mb-1">
                  {islamicTimes.recommended_bedtime.description}
                </h3>
                <p className="text-sm">{islamicTimes.recommended_bedtime.timing}</p>
                {islamicTimes.recommended_bedtime.hadith_reference && (
                  <p className="text-xs text-gray-600 mt-2 italic">
                    {islamicTimes.recommended_bedtime.hadith_reference}
                  </p>
                )}
              </div>

              <div className="p-3 bg-islamic-teal-50 rounded-lg">
                <h3 className="font-semibold text-islamic-teal-800 mb-1">
                  {islamicTimes.recommended_wake_time.description}
                </h3>
                <p className="text-sm">{islamicTimes.recommended_wake_time.timing}</p>
                {islamicTimes.recommended_wake_time.benefit && (
                  <p className="text-xs text-gray-600 mt-2">
                    <strong>Benefit:</strong> {islamicTimes.recommended_wake_time.benefit}
                  </p>
                )}
              </div>

              <div className="p-3 bg-islamic-gold-50 rounded-lg">
                <h3 className="font-semibold text-islamic-gold-800 mb-1">
                  {islamicTimes.night_prayer.description}
                </h3>
                <p className="text-sm">{islamicTimes.night_prayer.timing}</p>
                {islamicTimes.night_prayer.benefit && (
                  <p className="text-xs text-gray-600 mt-2">
                    <strong>Benefit:</strong> {islamicTimes.night_prayer.benefit}
                  </p>
                )}
              </div>
            </div>
          </SleepGuidanceCard>
        )}

        {/* Sleep Tips */}
        {tips && (
          <SleepGuidanceCard title="Sleep Tips from Sunnah" icon="💡" delay={0.3}>
            <div className="space-y-3">
              {tips.before_sleep.length > 0 && (
                <div>
                  <h3 className="font-semibold text-islamic-green-800 mb-2">Before Sleep:</h3>
                  <ul className="space-y-1 text-sm">
                    {tips.before_sleep.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-islamic-green-600 mr-2">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tips.sleeping_position && (
                <div className="p-3 bg-islamic-green-50 rounded-lg">
                  <h3 className="font-semibold text-islamic-green-800 mb-1">
                    Recommended Position: {tips.sleeping_position.recommended}
                  </h3>
                  <p className="text-xs text-gray-600 italic">{tips.sleeping_position.hadith}</p>
                </div>
              )}

              {tips.things_to_avoid.length > 0 && (
                <div>
                  <h3 className="font-semibold text-red-700 mb-2">Things to Avoid:</h3>
                  <ul className="space-y-1 text-sm">
                    {tips.things_to_avoid.map((avoid, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        <span>{avoid}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </SleepGuidanceCard>
        )}
      </div>

      {/* Bedtime Azkar Checklist */}
      {azkarChecklist && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 card p-6 bg-white"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-display text-islamic-green-700 mb-2">
              {azkarChecklist.title}
            </h2>
            <p className="text-gray-600">{azkarChecklist.description}</p>
          </div>

          <AzkarChecklist items={azkarChecklist.checklist} />

          {azkarChecklist.note && (
            <div className="mt-6 p-4 bg-islamic-gold-50 border-l-4 border-islamic-gold-500 rounded">
              <p className="text-sm text-gray-700 italic">{azkarChecklist.note}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center text-sm text-gray-500"
      >
        <p>
          May Allah grant us beneficial sleep and protect us from harm.
          All guidance is from authentic Islamic sources.
        </p>
      </motion.div>
    </div>
  )
}
