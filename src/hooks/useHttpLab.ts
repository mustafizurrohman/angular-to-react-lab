import { useState, useCallback, useRef, useEffect } from 'react'
import { defaultHttpClient } from '../services/httpClient.ts'
import type { HttpLogEntry, HttpResponseData, UserItem } from '../types/http.ts'

export function useHttpLab() {
  const [logs, setLogs] = useState<HttpLogEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [latencyMs, setLatencyMs] = useState(800)
  const [lastResponse, setLastResponse] = useState<HttpResponseData<unknown> | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)

  const addLog = useCallback((log: HttpLogEntry) => {
    setLogs((prev) => [log, ...prev.slice(0, 49)])
  }, [])

  useEffect(() => {
    defaultHttpClient.setLogListener(addLog)
    return () => {
      defaultHttpClient.setLogListener(undefined)
    }
  }, [addLog])

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)
    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      const res = await defaultHttpClient.request<UserItem[]>({
        url: '/api/users',
        method: 'GET',
        simulateLatencyMs: latencyMs,
        signal: controller.signal,
      })
      setLastResponse(res)
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        addLog({
          id: `abort_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'abort',
          phase: 'Aborted',
          message: 'Request was manually aborted by client AbortController.',
        })
        setErrorMessage('Request cancelled by user.')
      } else {
        const errorObj = err as { status?: number; data?: { error?: string } }
        setErrorMessage(
          `Request failed with status ${errorObj.status ?? 'Unknown'}: ${
            errorObj.data?.error ?? 'Error'
          }`
        )
      }
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }, [latencyMs, addLog])

  const createUser = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)
    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      const newUser: UserItem = {
        id: '',
        name: 'Katherine Johnson',
        email: 'katherine@nasa.gov',
        role: 'Orbital Mechanist',
      }
      const res = await defaultHttpClient.request<UserItem>({
        url: '/api/users',
        method: 'POST',
        body: newUser,
        simulateLatencyMs: latencyMs,
        signal: controller.signal,
      })
      setLastResponse(res)
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setErrorMessage('Request cancelled by user.')
      } else {
        setErrorMessage('Failed to create user.')
      }
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }, [latencyMs])

  const triggerError = useCallback(
    async (status: 404 | 500) => {
      setIsLoading(true)
      setErrorMessage(null)
      const controller = new AbortController()
      abortControllerRef.current = controller

      try {
        await defaultHttpClient.request({
          url: `/api/users/error-simulation`,
          method: 'GET',
          simulateLatencyMs: latencyMs,
          simulateErrorStatus: status,
          signal: controller.signal,
        })
      } catch (err: unknown) {
        const errRes = err as HttpResponseData<{ error: string }>
        setLastResponse(errRes)
        setErrorMessage(`Received simulated ${status} error response from server.`)
      } finally {
        setIsLoading(false)
        abortControllerRef.current = null
      }
    },
    [latencyMs]
  )

  const cancelActiveRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
  }, [])

  const clearLogs = useCallback(() => {
    setLogs([])
  }, [])

  return {
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
  }
}
