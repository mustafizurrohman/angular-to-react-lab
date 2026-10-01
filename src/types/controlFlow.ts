export type DeferTrigger = 'viewport' | 'interaction' | 'timer' | 'immediate' | 'error'

export type PriorityLevel = 'critical' | 'high' | 'medium' | 'low'

export interface TaskItem {
  id: string
  title: string
  priority: PriorityLevel
  category: string
  completed: boolean
}

export type DeferState = 'idle' | 'placeholder' | 'loading' | 'loaded' | 'error'
