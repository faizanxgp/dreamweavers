// User types
export interface User {
  id: string
  email: string
  username: string
  full_name?: string
  avatar_url?: string
  bio?: string
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
  token_type: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  email: string
  username: string
  password: string
  full_name?: string
}

// Dream types
export interface Dream {
  id: string
  user_id: string
  title: string
  content: string
  dream_date: string
  mood?: 'positive' | 'negative' | 'neutral' | 'mixed'
  is_istikhara: boolean
  is_public: boolean
  tags: string[]
  interpretations: Interpretation[]
  likes_count: number
  comments_count: number
  is_liked?: boolean
  created_at: string
  updated_at: string
  user?: User
}

export interface CreateDreamData {
  title: string
  content: string
  dream_date: string
  mood?: string
  is_istikhara: boolean
  is_public: boolean
  tags?: string[]
}

// Interpretation types
export enum InterpretationType {
  AI = 'ai',
  IMAM = 'imam',
  COMMUNITY = 'community'
}

export enum InterpretationStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  REJECTED = 'rejected'
}

export interface Interpretation {
  id: string
  dream_id: string
  interpreter_id?: string
  interpretation_type: InterpretationType
  content: string
  confidence_score?: number
  status: InterpretationStatus
  references?: string[]
  tags: string[]
  likes_count: number
  is_liked?: boolean
  created_at: string
  updated_at: string
  interpreter?: User
}

export interface RequestInterpretationData {
  dream_id: string
  interpretation_type: InterpretationType
  additional_context?: string
}

// Symbol types
export interface Symbol {
  id: string
  name: string
  arabic_name?: string
  description: string
  category: string
  interpretations: string[]
  references: string[]
  related_symbols: string[]
}

// Social types
export interface Comment {
  id: string
  dream_id?: string
  interpretation_id?: string
  user_id: string
  content: string
  likes_count: number
  is_liked?: boolean
  created_at: string
  user?: User
}

export interface Like {
  id: string
  user_id: string
  dream_id?: string
  interpretation_id?: string
  comment_id?: string
  created_at: string
}

// Sleep tracking types
export interface SleepEntry {
  id: string
  user_id: string
  sleep_date: string
  bedtime: string
  wake_time: string
  sleep_duration: number
  sleep_quality: number
  dreams_count: number
  notes?: string
  created_at: string
}

export interface SleepStats {
  average_duration: number
  average_quality: number
  total_dreams: number
  sleep_pattern: 'consistent' | 'irregular' | 'improving' | 'worsening'
}

// Azkar types
export interface Azkar {
  id: string
  title: string
  arabic_text: string
  transliteration: string
  translation: string
  category: 'before_sleep' | 'after_waking' | 'general'
  repetitions: number
  audio_url?: string
  reference: string
}

// Notification types
export interface Notification {
  id: string
  user_id: string
  type: 'interpretation_ready' | 'new_comment' | 'new_like' | 'imam_response'
  title: string
  message: string
  link?: string
  is_read: boolean
  created_at: string
}

// Pagination types
export interface PaginationParams {
  page?: number
  limit?: number
  sort_by?: string
  order?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  pages: number
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  status?: number
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'textarea' | 'date' | 'select' | 'checkbox'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
}

// Filter types
export interface DreamFilters {
  mood?: string
  is_istikhara?: boolean
  date_from?: string
  date_to?: string
  tags?: string[]
  search?: string
}

// Stats types
export interface UserStats {
  total_dreams: number
  total_interpretations: number
  dreams_this_month: number
  most_common_symbols: string[]
  sleep_quality_avg: number
}
