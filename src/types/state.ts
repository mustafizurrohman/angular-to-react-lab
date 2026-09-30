export interface HistoryEntry {
  id: string
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
  | { type: 'ADD_ITEM'; payload: { id: string; name: string } }
  | { type: 'INCREMENT'; payload: { id: string } }
  | { type: 'DECREMENT'; payload: { id: string } }
  | { type: 'REMOVE'; payload: { id: string } }
  | { type: 'CLEAR' }
