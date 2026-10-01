import type {
  HttpRequestConfig,
  HttpResponseData,
  HttpLogEntry,
  UserItem,
} from '../types/http.ts'

const MOCK_USERS: UserItem[] = [
  { id: 'usr_1', name: 'Ada Lovelace', email: 'ada@computing.org', role: 'Architect' },
  { id: 'usr_2', name: 'Alan Turing', email: 'alan@bletchley.ac.uk', role: 'Cryptanalyst' },
  { id: 'usr_3', name: 'Grace Hopper', email: 'grace@navy.mil', role: 'Compiler Pioneer' },
  { id: 'usr_4', name: 'Margaret Hamilton', email: 'margaret@apollo.nasa.gov', role: 'Flight Software Lead' },
]

export type LogListener = (log: HttpLogEntry) => void

export class ExtensibleHttpClient {
  private logListener?: LogListener

  constructor(listener?: LogListener) {
    this.logListener = listener
  }

  setLogListener(listener?: LogListener) {
    this.logListener = listener
  }

  private emitLog(
    type: HttpLogEntry['type'],
    phase: HttpLogEntry['phase'],
    message: string,
    details?: Record<string, unknown>
  ) {
    if (this.logListener) {
      this.logListener({
        id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toLocaleTimeString(),
        type,
        phase,
        message,
        details,
      })
    }
  }

  async request<T>(config: HttpRequestConfig): Promise<HttpResponseData<T>> {
    const startTime = performance.now()

    this.emitLog(
      'request',
      'Request Intercepted',
      `Pipeline initiated for [${config.method}] ${config.url}`,
      { url: config.url, method: config.method }
    )

    // Interceptor 1: Auth & Headers (SRP)
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer mock_jwt_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      'X-Request-Id': `req_${Date.now()}`,
      'X-Client-Version': 'React-Lab-19.2',
      ...(config.headers || {}),
    }

    this.emitLog(
      'interceptor',
      'Header Attached',
      `AuthInterceptor appended Bearer JWT & X-Request-Id (${headers['X-Request-Id']})`,
      { headers }
    )

    const latency = config.simulateLatencyMs ?? 600

    this.emitLog(
      'request',
      'Dispatched',
      `Dispatched to mock server with simulated latency of ${latency}ms...`
    )

    // Simulate Network Latency with AbortSignal listening
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => {
        resolve()
      }, latency)

      if (config.signal) {
        config.signal.addEventListener('abort', () => {
          clearTimeout(timer)
          reject(new DOMException('The user aborted a request.', 'AbortError'))
        })
      }
    })

    const durationMs = Math.round(performance.now() - startTime)

    // Simulate Error Statuses
    if (config.simulateErrorStatus && config.simulateErrorStatus >= 400) {
      this.emitLog(
        'error',
        'Error Handled',
        `Simulated HTTP error ${config.simulateErrorStatus} returned from server.`,
        { status: config.simulateErrorStatus }
      )
      const errResponse: HttpResponseData<unknown> = {
        status: config.simulateErrorStatus,
        statusText:
          config.simulateErrorStatus === 404
            ? 'Not Found'
            : config.simulateErrorStatus === 401
            ? 'Unauthorized'
            : 'Internal Server Error',
        headers,
        data: { error: `Server error code ${config.simulateErrorStatus}` },
        durationMs,
      }
      throw errResponse
    }

    // Mock Data Routing
    let responseData: unknown

    if (config.url === '/api/users' && config.method === 'GET') {
      responseData = [...MOCK_USERS]
    } else if (config.url === '/api/users' && config.method === 'POST') {
      const newUser = config.body as UserItem
      responseData = {
        ...newUser,
        id: `usr_${Date.now()}`,
        created: true,
      }
    } else {
      responseData = { message: 'Success', echo: config.body }
    }

    this.emitLog(
      'response',
      'Response Intercepted',
      `ResponseInterceptor received status 200 OK (${durationMs}ms)`,
      { durationMs, status: 200 }
    )

    return {
      status: 200,
      statusText: 'OK',
      headers: {
        ...headers,
        'X-Response-Time': `${durationMs}ms`,
      },
      data: responseData as T,
      durationMs,
    }
  }
}

export const defaultHttpClient = new ExtensibleHttpClient()
