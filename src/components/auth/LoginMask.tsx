import { useState, type FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth.ts'
import './LoginMask.css'

export function LoginMask() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const success = login(username, password)
    if (!success) {
      setError("Invalid username or password. Please use username 'demo' and password 'demo'.")
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-badge" aria-hidden="true">
            ⚛️
          </div>
          <h1 className="login-title">Sign In to React Lab</h1>
          <p className="login-subtitle">
            Enter your credentials to access the lab modules
          </p>
        </div>

        {error && (
          <div className="login-error" role="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="login-input"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                if (error) setError(null)
              }}
              placeholder="demo"
              required
              autoFocus
              autoComplete="username"
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (error) setError(null)
              }}
              placeholder="••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-submit-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
