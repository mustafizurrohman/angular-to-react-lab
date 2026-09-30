export interface User {
  username: string
}

export interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
}
