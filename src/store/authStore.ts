import { create } from 'zustand'

interface User {
  id?: string
  username?: string
  email: string
}

interface AuthState {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, username?: string, id?: string) => void
  logout: () => void
  register: (email: string, username?: string, id?: string) => void
}

// Utility to safely load user from localStorage (avoids SSR crash)
const loadUser = (): User | null => {
  if (typeof window === 'undefined') return null
  try {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  } catch {
    return null
  }
}

export const useAuthStore = create<AuthState>((set) => {
  const initialUser = loadUser()

  return {
    user: initialUser,
    isLoggedIn: !!initialUser,

    login: (email, username = '', id = '') => {
      const user = { email, username, id }
      localStorage.setItem('user', JSON.stringify(user))
      set({ user, isLoggedIn: true })
    },

    register: (email, username = '', id = '') => {
      const user = { email, username, id }
      localStorage.setItem('user', JSON.stringify(user))
      set({ user, isLoggedIn: true })
    },

    logout: () => {
      localStorage.removeItem('user')
      set({ user: null, isLoggedIn: false })
    },
  }
})
