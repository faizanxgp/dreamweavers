/**
 * Azkar TypeScript Types
 */

export interface Azkar {
  id: number
  arabic_text: string
  transliteration?: string
  translation: string
  category: 'night' | 'sleep' | 'morning' | 'evening'
  reference?: string
  display_order: number
  created_at: string
  updated_at: string
}

export interface AzkarListResponse {
  total: number
  azkar: Azkar[]
}
