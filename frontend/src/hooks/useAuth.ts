import { create } from 'zustand'
import { User, AuthTokens, LoginCredentials, SignupData } from '@/types'
import { storage, STORAGE_KEYS } from '@utils/storage'

interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => void
  updateUser: (user: User) => void
  initialize: () => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (credentials: LoginCredentials) => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/login', credentials)
      // const { user, tokens } = response.data

      // Mock data for now
      const mockTokens: AuthTokens = {
        access_token: 'mock_access_token',
        refresh_token: 'mock_refresh_token',
        token_type: 'Bearer',
      }

      const mockUser: User = {
        id: '1',
        email: credentials.email,
        username: 'user123',
        full_name: 'Test User',
        is_verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      storage.set(STORAGE_KEYS.AUTH_TOKEN, mockTokens.access_token)
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, mockTokens.refresh_token)
      storage.set(STORAGE_KEYS.USER, mockUser)

      set({ user: mockUser, tokens: mockTokens, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  signup: async (data: SignupData) => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/signup', data)
      // const { user, tokens } = response.data

      // Mock data for now
      const mockTokens: AuthTokens = {
        access_token: 'mock_access_token',
        refresh_token: 'mock_refresh_token',
        token_type: 'Bearer',
      }

      const mockUser: User = {
        id: '1',
        email: data.email,
        username: data.username,
        full_name: data.full_name,
        is_verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      storage.set(STORAGE_KEYS.AUTH_TOKEN, mockTokens.access_token)
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, mockTokens.refresh_token)
      storage.set(STORAGE_KEYS.USER, mockUser)

      set({ user: mockUser, tokens: mockTokens, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  logout: () => {
    storage.remove(STORAGE_KEYS.AUTH_TOKEN)
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN)
    storage.remove(STORAGE_KEYS.USER)
    set({ user: null, tokens: null, isAuthenticated: false })
  },

  updateUser: (user: User) => {
    storage.set(STORAGE_KEYS.USER, user)
    set({ user })
  },

  initialize: () => {
    const token = storage.get<string>(STORAGE_KEYS.AUTH_TOKEN)
    const user = storage.get<User>(STORAGE_KEYS.USER)

    if (token && user) {
      set({ user, isAuthenticated: true, isLoading: false })
    } else {
      set({ isLoading: false })
    }
  },
}))
