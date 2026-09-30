import { useState } from 'react'
import type { HistoryEntry } from '../types/state.ts'

export function useCounterWithHistory(initialCount: number = 0, initialStep: number = 1) {
  const [count, setCount] = useState<number>(initialCount)
  const [step, setStep] = useState<number>(initialStep)
  const [history, setHistory] = useState<HistoryEntry[]>([])

  const updateCount = (delta: number) => {
    const next = count + delta
    setCount(next)
    setHistory((prev) => [
      {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        action: delta > 0 ? `+${delta}` : `${delta}`,
        value: next,
      },
      ...prev.slice(0, 9),
    ])
  }

  const handleReset = () => {
    setCount(0)
    setHistory((prev) => [
      {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        action: 'Reset to 0',
        value: 0,
      },
      ...prev.slice(0, 9),
    ])
  }

  return {
    count,
    step,
    history,
    setStep,
    updateCount,
    handleReset,
  }
}
