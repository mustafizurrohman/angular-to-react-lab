export interface HistoryEntry {
  id: number
  timestamp: string
  action: string
  value: number
}

export interface CartItem {
  id: string
  name: string
  quantity: number
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { name: string } }
  | { type: 'INCREMENT'; payload: { id: string } }
  | { type: 'DECREMENT'; payload: { id: string } }
  | { type: 'REMOVE'; payload: { id: string } }
  | { type: 'CLEAR' }
