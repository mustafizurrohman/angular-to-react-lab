import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

/**
 * Props for the ErrorBoundary component.
 */
interface ErrorBoundaryProps {
  /**
   * React content that should be protected by the error boundary.
   */
  children: ReactNode

  /**
   * Optional fallback UI displayed when a rendering error is caught.
   *
   * Provide a React node for static fallback content, or a function when the
   * fallback needs access to the thrown error and the reset handler.
   */
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode)
}

/**
 * Internal state used to track whether a child component failed during render.
 */
interface ErrorBoundaryState {
  /**
   * Indicates whether the boundary has caught an error.
   */
  hasError: boolean

  /**
   * The most recent error caught by the boundary.
   */
  error: Error | null
}

/**
 * Catches rendering errors from descendant components and displays fallback UI.
 *
 * This class component is required because React error boundaries currently rely
 * on lifecycle methods that are not available in function components.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  }

  /**
   * Updates state after React detects an error in a descendant component.
   */
  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  /**
   * Logs details about uncaught rendering errors for debugging.
   */
  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled rendering error:', error, errorInfo)
  }

  /**
   * Clears the captured error and attempts to render the protected children again.
   */
  private handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  /**
   * Renders the protected children, a custom fallback, or the default error UI.
   */
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
