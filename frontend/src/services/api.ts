/**
 * API Service - Central API client for backend communication
 */
import axios, { AxiosInstance, AxiosError } from 'axios'
import toast from 'react-hot-toast'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          toast.error('Session expired. Please login again.')
          // Redirect to login page
          window.location.href = '/login'
          break
        case 403:
          toast.error('You do not have permission to perform this action.')
          break
        case 404:
          toast.error('Resource not found.')
          break
        case 500:
          toast.error('Server error. Please try again later.')
          break
        default:
          toast.error('An error occurred. Please try again.')
      }
    } else if (error.request) {
      // Request made but no response
      toast.error('Network error. Please check your connection.')
    }

    return Promise.reject(error)
  }
)

// API endpoints
export const dreamAPI = {
  // Get all dreams for current user
  getMyDreams: () => api.get('/dreams'),

  // Get specific dream
  getDream: (id: number) => api.get(`/dreams/${id}`),

  // Create new dream
  createDream: (data: any) => api.post('/dreams', data),

  // Update dream
  updateDream: (id: number, data: any) => api.put(`/dreams/${id}`, data),

  // Delete dream
  deleteDream: (id: number) => api.delete(`/dreams/${id}`),

  // Request interpretation
  requestInterpretation: (dreamId: number) => api.post(`/dreams/${dreamId}/interpret`),
}

export const interpretationAPI = {
  // Get interpretation for dream
  getInterpretation: (dreamId: number) => api.get(`/interpretations/${dreamId}`),

  // Rate interpretation
  rateInterpretation: (id: number, rating: number, feedback?: string) =>
    api.post(`/interpretations/${id}/rate`, { rating, feedback }),

  // Request Imam consultation
  requestImamConsultation: (dreamId: number) => api.post(`/interpretations/imam/request`, { dreamId }),
}

export const socialAPI = {
  // Get social feed
  getFeed: (page = 1, limit = 20) => api.get(`/social/feed?page=${page}&limit=${limit}`),

  // Share dream
  shareDream: (dreamId: number, caption?: string) =>
    api.post('/social/share', { dreamId, caption }),

  // Like post
  likePost: (postId: number) => api.post(`/social/posts/${postId}/like`),

  // Unlike post
  unlikePost: (postId: number) => api.delete(`/social/posts/${postId}/like`),

  // Comment on post
  commentPost: (postId: number, text: string) =>
    api.post(`/social/posts/${postId}/comments`, { text }),

  // Get comments
  getComments: (postId: number) => api.get(`/social/posts/${postId}/comments`),
}

export const authAPI = {
  // Login
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  // Register
  register: (data: any) => api.post('/auth/register', data),

  // Refresh token
  refreshToken: (refreshToken: string) =>
    api.post('/auth/refresh', { refreshToken }),

  // Logout
  logout: () => api.post('/auth/logout'),

  // Get current user
  getCurrentUser: () => api.get('/auth/me'),
}

export const istkharaAPI = {
  // Submit Istikhara dream
  submitIstikharaDream: (data: any) => api.post('/istikhara', data),

  // Get Istikhara interpretation
  getIstikharaInterpretation: (id: number) => api.get(`/istikhara/${id}`),
}

export const azkarAPI = {
  // Get all Azkar with optional category filter
  getAllAzkar: (category?: string) => {
    const params = category ? { category } : {}
    return api.get('/azkar', { params })
  },

  // Get night Azkar
  getNightAzkar: () => api.get('/azkar/night'),

  // Get sleep Duas
  getSleepDuas: () => api.get('/azkar/sleep'),

  // Get morning Azkar
  getMorningAzkar: () => api.get('/azkar/morning'),

  // Get evening Azkar
  getEveningAzkar: () => api.get('/azkar/evening'),

  // Get specific Azkar by ID
  getAzkarById: (id: number) => api.get(`/azkar/${id}`),
}

export const sleepAPI = {
  // Get sleep guidance
  getGuidance: () => api.get('/sleep/guidance'),

  // Get Islamic sleep times
  getIslamicTimes: () => api.get('/sleep/islamic-times'),

  // Get sleep tips
  getTips: () => api.get('/sleep/tips'),

  // Get bedtime Azkar checklist
  getAzkarChecklist: () => api.get('/sleep/azkar-checklist'),

  // Log sleep data
  logSleep: (data: any) => api.post('/sleep/log', data),

  // Get sleep statistics
  getSleepStats: () => api.get('/sleep/stats'),
}

export default api
