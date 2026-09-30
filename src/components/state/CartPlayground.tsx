import type { FormEvent } from 'react'
import type { CartItem } from '../../types/state.ts'
import { EmptyState } from '../common/EmptyState.tsx'

interface CartPlaygroundProps {
  cart: CartItem[]
  newItemName: string
  totalItems: number
  onNewItemNameChange: (val: string) => void
  onAddItem: (e: FormEvent) => void
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
  onRemove: (id: string) => void
  onClear: () => void
}

export function CartPlayground({
  cart,
  newItemName,
  totalItems,
  onNewItemNameChange,
  onAddItem,
  onIncrement,
  onDecrement,
  onRemove,
  onClear,
}: CartPlaygroundProps) {
  return (
    <div className="cart-container">
      <div className="cart-header">
        <h3>Shopping Cart ({totalItems} items)</h3>
        {cart.length > 0 && (
          <button type="button" className="reset-btn" onClick={onClear}>
            Clear All
          </button>
        )}
      </div>

      <form onSubmit={onAddItem} className="add-item-form">
        <input
          type="text"
          placeholder="Add learning resource..."
          value={newItemName}
          onChange={(e) => onNewItemNameChange(e.target.value)}
          className="text-input"
        />
        <button type="submit" className="counter-btn" disabled={!newItemName.trim()}>
          Add Resource
        </button>
      </form>

      {cart.length === 0 ? (
        <EmptyState>Cart is empty. Add a resource above.</EmptyState>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <span className="cart-item-name">{item.name}</span>
              <div className="cart-controls">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => onDecrement(item.id)}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="cart-item-qty">{item.quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => onIncrement(item.id)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => onRemove(item.id)}
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
