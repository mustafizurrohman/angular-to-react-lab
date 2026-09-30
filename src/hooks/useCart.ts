import { useState, useReducer, useMemo, useCallback } from 'react'
import type { FormEvent } from 'react'
import type { CartItem, CartAction } from '../types/state.ts'
import { INITIAL_CART_ITEMS } from '../data/stateData.ts'

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(
        (item) => item.name.toLowerCase() === action.payload.name.toLowerCase(),
      )
      if (existing) {
        return state.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [
        ...state,
        { id: action.payload.id, name: action.payload.name, quantity: 1 },
      ]
    }
    case 'INCREMENT':
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
      )
    case 'DECREMENT':
      return state
        .map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0)
    case 'REMOVE':
      return state.filter((item) => item.id !== action.payload.id)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function useCart(initialItems: CartItem[] = INITIAL_CART_ITEMS) {
  const [cart, dispatch] = useReducer(cartReducer, initialItems)
  const [newItemName, setNewItemName] = useState('')

  const handleAddItem = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      const trimmed = newItemName.trim()
      if (!trimmed) return

      const newId =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `item-${Date.now()}`

      dispatch({ type: 'ADD_ITEM', payload: { id: newId, name: trimmed } })
      setNewItemName('')
    },
    [newItemName],
  )

  const increment = useCallback((id: string) => {
    dispatch({ type: 'INCREMENT', payload: { id } })
  }, [])

  const decrement = useCallback((id: string) => {
    dispatch({ type: 'DECREMENT', payload: { id } })
  }, [])

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE', payload: { id } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' })
  }, [])

  const totalItems = useMemo(
    () => cart.reduce((acc, curr) => acc + curr.quantity, 0),
    [cart],
  )

  return {
    cart,
    newItemName,
    setNewItemName,
    totalItems,
    handleAddItem,
    increment,
    decrement,
    removeItem,
    clearCart,
  }
}
