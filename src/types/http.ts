export interface HttpRequestConfig {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: unknown
  signal?: AbortSignal
  simulateLatencyMs?: number
  simulateErrorStatus?: number
}

export interface HttpResponseData<T = unknown> {
  status: number
  statusText: string
  headers: Record<string, string>
  data: T
  durationMs: number
}

export interface HttpLogEntry {
  id: string
  timestamp: string
  type: 'request' | 'interceptor' | 'response' | 'error' | 'abort'
  phase: 'Request Intercepted' | 'Header Attached' | 'Dispatched' | 'Response Intercepted' | 'Completed' | 'Aborted' | 'Error Handled'
  message: string
  details?: Record<string, unknown>
}

export interface UserItem {
  id: string
  name: string
  email: string
  role: string
}
