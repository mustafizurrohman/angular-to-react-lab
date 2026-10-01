import { useState, useCallback, useEffect, useRef } from 'react'
import type { TaskItem, DeferTrigger, DeferState, PriorityLevel } from '../types/controlFlow.ts'

const INITIAL_TASKS: TaskItem[] = [
  { id: 'task-1', title: 'Audit Angular NgModules for Standalone migration', priority: 'critical', category: 'architecture', completed: true },
  { id: 'task-2', title: 'Refactor *ngIf and *ngFor to modern @if and @for syntax', priority: 'high', category: 'templates', completed: false },
  { id: 'task-3', title: 'Adopt fine-grained Signals for local component reactivity', priority: 'high', category: 'reactivity', completed: false },
  { id: 'task-4', title: 'Implement @defer blocks for off-screen heavy chart widgets', priority: 'medium', category: 'performance', completed: false },
  { id: 'task-5', title: 'Extract functional route guards and HTTP interceptors', priority: 'low', category: 'routing', completed: false },
]

export function useControlFlowLab() {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS)
  const [filterPriority, setFilterPriority] = useState<PriorityLevel | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCompletedOnly, setShowCompletedOnly] = useState(false)

  // Defer Simulation State
  const [deferTrigger, setDeferTrigger] = useState<DeferTrigger>('interaction')
  const [deferState, setDeferState] = useState<DeferState>('placeholder')
  const [timerSeconds, setTimerSeconds] = useState(3)

  const timerRef = useRef<number | null>(null)

  // Control Flow Actions
  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }, [])

  const addTask = useCallback((title: string, priority: PriorityLevel) => {
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title,
      priority,
      category: 'general',
      completed: false,
    }
    setTasks((prev) => [newTask, ...prev])
  }, [])

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const clearAllTasks = useCallback(() => {
    setTasks([])
  }, [])

  const resetDefaultTasks = useCallback(() => {
    setTasks(INITIAL_TASKS)
    setFilterPriority('all')
    setSearchQuery('')
    setShowCompletedOnly(false)
  }, [])

  // Filtered Task List
  const filteredTasks = tasks.filter((t) => {
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false
    if (showCompletedOnly && !t.completed) return false
    if (searchQuery.trim() && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  // Defer Trigger Simulation Logic
  const executeDeferTrigger = useCallback((trigger: DeferTrigger) => {
    setDeferTrigger(trigger)
    setDeferState('loading')

    if (trigger === 'error') {
      setTimeout(() => {
        setDeferState('error')
      }, 700)
      return
    }

    if (trigger === 'timer') {
      setTimerSeconds(3)
      let remaining = 3
      if (timerRef.current) clearInterval(timerRef.current)

      timerRef.current = window.setInterval(() => {
        remaining -= 1
        setTimerSeconds(remaining)
        if (remaining <= 0) {
          if (timerRef.current) clearInterval(timerRef.current)
          setDeferState('loaded')
        }
      }, 1000)
      return
    }

    setTimeout(() => {
      setDeferState('loaded')
    }, trigger === 'immediate' ? 200 : 900)
  }, [])

  const resetDeferSimulation = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setDeferState('placeholder')
    setTimerSeconds(3)
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return {
    tasks,
    filteredTasks,
    filterPriority,
    setFilterPriority,
    searchQuery,
    setSearchQuery,
    showCompletedOnly,
    setShowCompletedOnly,
    toggleTask,
    addTask,
    removeTask,
    clearAllTasks,
    resetDefaultTasks,
    deferTrigger,
    deferState,
    timerSeconds,
    executeDeferTrigger,
    resetDeferSimulation,
  }
}
