import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode)
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled rendering error:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  public override render() {
    if (this.state.hasError && this.state.error) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error, this.handleReset)
      }
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="page-wrapper" role="alert" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <div className="lab-section" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ color: '#ef4444', marginBottom: '12px' }}>Something went wrong</h2>
            <p className="section-desc">
              An unexpected error occurred in this module. You can try refreshing the component or returning to the hub.
            </p>
            <pre
              style={{
                background: 'var(--code-bg)',
                padding: '12px',
                borderRadius: '6px',
                fontSize: '13px',
                color: 'var(--text-h)',
                textAlign: 'left',
                overflowX: 'auto',
                marginBottom: '20px',
              }}
            >
              {this.state.error.message}
            </pre>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button type="button" className="counter-btn" onClick={this.handleReset}>
                Try Again
              </button>
              <a href="/" className="reset-btn" style={{ textDecoration: 'none' }}>
                Return to Hub
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
