import type { CartItem } from '../types/state.ts'

export const INITIAL_CART_ITEMS: CartItem[] = [
  { id: '1', name: 'React Hooks Guide', quantity: 1 },
  { id: '2', name: 'TypeScript Handbook', quantity: 2 },
]

export const STEP_OPTIONS: number[] = [1, 5, 10]
