/**
 * Sleep Guidance TypeScript Types
 */

export interface SleepGuidance {
  recommendation: string
  suggested_bedtime?: string
  azkar_suggestions: string[]
  tips: string[]
}

export interface IslamicSleepTime {
  description: string
  timing: string
  hadith_reference?: string
  benefit?: string
  reason?: string
}

export interface IslamicSleepTimes {
  recommended_bedtime: IslamicSleepTime
  recommended_wake_time: IslamicSleepTime
  night_prayer: IslamicSleepTime
  avoid_sleep_times: IslamicSleepTime[]
}

export interface SleepTips {
  before_sleep: string[]
  sleeping_position: {
    recommended: string
    hadith: string
  }
  duas_to_recite: string[]
  things_to_avoid: string[]
  benefits: string[]
}

export interface AzkarChecklistItem {
  order: number
  item: string
  category: string
  importance: string
  benefit?: string
  translation?: string
  method?: string
  note?: string
}

export interface AzkarChecklist {
  title: string
  description: string
  checklist: AzkarChecklistItem[]
  note?: string
}
