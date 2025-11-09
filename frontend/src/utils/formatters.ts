/**
 * Text and number formatting utilities
 */

/**
 * Truncate text to a specified length
 */
export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text
  return text.substring(0, length).trim() + '...'
}

/**
 * Format number with abbreviations (e.g., 1.2k, 3.4M)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

/**
 * Capitalize first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Convert string to title case
 */
export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ')
}

/**
 * Extract hashtags from text
 */
export function extractHashtags(text: string): string[] {
  const regex = /#(\w+)/g
  const matches = text.matchAll(regex)
  return Array.from(matches, (match) => match[1])
}

/**
 * Generate initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

/**
 * Format sleep quality score to descriptive text
 */
export function formatSleepQuality(score: number): string {
  if (score >= 4.5) return 'Excellent'
  if (score >= 3.5) return 'Good'
  if (score >= 2.5) return 'Fair'
  if (score >= 1.5) return 'Poor'
  return 'Very Poor'
}

/**
 * Get mood emoji
 */
export function getMoodEmoji(mood: string): string {
  const moodMap: Record<string, string> = {
    positive: '😊',
    negative: '😔',
    neutral: '😐',
    mixed: '🤔',
  }
  return moodMap[mood] || '😐'
}

/**
 * Generate random color for avatar
 */
export function getAvatarColor(id: string): string {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ]
  const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[index % colors.length]
}
