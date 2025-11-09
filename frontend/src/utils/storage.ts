/**
 * LocalStorage utility functions with type safety
 */

export const storage = {
  /**
   * Get item from localStorage
   */
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue ?? null
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return defaultValue ?? null
    }
  },

  /**
   * Set item in localStorage
   */
  set: <T>(key: string, value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  },

  /**
   * Remove item from localStorage
   */
  remove: (key: string): void => {
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  },

  /**
   * Clear all localStorage
   */
  clear: (): void => {
    try {
      window.localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  },
}

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const
