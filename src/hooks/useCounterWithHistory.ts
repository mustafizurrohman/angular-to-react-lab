import { useState, useCallback } from 'react'
import type { HistoryEntry } from '../types/state.ts'

export function useCounterWithHistory(initialCount: number = 0, initialStep: number = 1) {
  const [count, setCount] = useState<number>(initialCount)
  const [step, setStep] = useState<number>(initialStep)
  const [history, setHistory] = useState<HistoryEntry[]>([])

  const updateCount = useCallback(
    (delta: number) => {
      setCount((prevCount) => {
        const next = prevCount + delta
        const entryId =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `hist-${Date.now()}-${Math.random()}`

        setHistory((prev) => [
          {
            id: entryId,
            timestamp: new Date().toLocaleTimeString(),
            action: delta > 0 ? `+${delta}` : `${delta}`,
            value: next,
          },
          ...prev.slice(0, 9),
        ])
        return next
      })
    },
    [],
  )

  const handleReset = useCallback(() => {
    setCount(0)
    const entryId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `hist-${Date.now()}-${Math.random()}`

    setHistory((prev) => [
      {
        id: entryId,
        timestamp: new Date().toLocaleTimeString(),
        action: 'Reset to 0',
        value: 0,
      },
      ...prev.slice(0, 9),
    ])
  }, [])

  return {
    count,
    step,
    history,
    setStep,
    updateCount,
    handleReset,
  }
}
