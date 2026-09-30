import { useState, type ReactNode } from 'react'
import { AuthContext } from './AuthContext.ts'
import type { User } from '../types/auth.ts'

const AUTH_STORAGE_KEY = 'lab_auth_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY)
        if (stored) {
          return JSON.parse(stored) as User
        }
      }
    } catch {
      // Ignore storage read errors
    }
    return null
  })

  const isAuthenticated = user !== null

  const login = (username: string, password: string): boolean => {
    if (username === 'demo' && password === 'demo') {
      const newUser: User = { username: 'demo' }
      setUser(newUser)
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser))
        }
      } catch {
        // Ignore storage write errors
      }
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    } catch {
      // Ignore storage write errors
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
