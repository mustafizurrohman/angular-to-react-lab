import { useHttpLab } from '../hooks/useHttpLab.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { PageHeader } from '../components/common/PageHeader.tsx'
import { SectionHeader } from '../components/common/SectionHeader.tsx'
import { HttpPlayground } from '../components/http/HttpPlayground.tsx'
import { HttpInterceptorLogs } from '../components/http/HttpInterceptorLogs.tsx'
import { HttpArchitectureComparison } from '../components/http/HttpArchitectureComparison.tsx'
import './Pages.css'

export function HttpLab() {
  useDocumentTitle('HTTP & Data Fetching')

  const {
    logs,
    isLoading,
    latencyMs,
    setLatencyMs,
    lastResponse,
    errorMessage,
    fetchUsers,
    createUser,
    triggerError,
    cancelActiveRequest,
    clearLogs,
  } = useHttpLab()

  return (
    <div className="page-wrapper">
      <PageHeader
        title="HTTP Client & Interceptor Pipeline Lab"
        subtitle={
          <>
            Explore asynchronous data fetching, functional interceptors, header decoration, error recovery, and request cancellation with <code>AbortController</code> vs Angular&apos;s <code>HttpClient</code> and <code>HttpInterceptorFn</code>.
          </>
        }
      />

      <div className="lab-section">
        <SectionHeader
          title="1. Interactive HTTP Dispatcher & Interceptor Pipeline"
          description="Trigger GET or POST requests with configurable latency, test error recovery, or abort in-flight requests while observing the real-time interceptor logs."
        />

        <div className="state-playground http-playground-grid">
          <HttpPlayground
            isLoading={isLoading}
            latencyMs={latencyMs}
            lastResponse={lastResponse}
            errorMessage={errorMessage}
            onLatencyChange={setLatencyMs}
            onFetchUsers={fetchUsers}
            onCreateUser={createUser}
            onTriggerError={triggerError}
            onCancelRequest={cancelActiveRequest}
          />

          <HttpInterceptorLogs logs={logs} onClearLogs={clearLogs} />
        </div>
      </div>

      <div className="lab-section" style={{ marginTop: '2.5rem' }}>
        <SectionHeader
          title="2. Architectural Comparison: HttpClient Interceptors & Middleware"
          description="Discover how interceptors encapsulate orthogonal cross-cutting concerns (authentication, tracing, performance timing, retry) following SOLID principles."
        />

        <HttpArchitectureComparison />
      </div>
    </div>
  )
}
