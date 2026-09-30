import { useState, useReducer } from 'react'
import './Pages.css'

interface HistoryEntry {
  id: number
  timestamp: string
  action: string
  value: number
}

interface Item {
  id: string
  name: string
  quantity: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { name: string } }
  | { type: 'INCREMENT'; payload: { id: string } }
  | { type: 'DECREMENT'; payload: { id: string } }
  | { type: 'REMOVE'; payload: { id: string } }
  | { type: 'CLEAR' }

function cartReducer(state: Item[], action: CartAction): Item[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((item) => item.name.toLowerCase() === action.payload.name.toLowerCase())
      if (existing) {
        return state.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...state, { id: Date.now().toString(), name: action.payload.name, quantity: 1 }]
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

export function StateLab() {
  // Demo 1: useState with step & history
  const [count, setCount] = useState<number>(0)
  const [step, setStep] = useState<number>(1)
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

  // Demo 2: useReducer for structured multi-action state
  const initialCart: Item[] = [
    { id: '1', name: 'React Hooks Guide', quantity: 1 },
    { id: '2', name: 'TypeScript Handbook', quantity: 2 },
  ]
  const [cart, dispatch] = useReducer(cartReducer, initialCart)
  const [newItemName, setNewItemName] = useState('')

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItemName.trim()) return
    dispatch({ type: 'ADD_ITEM', payload: { name: newItemName.trim() } })
    setNewItemName('')
  }

  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0)

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">Interactive State Management</h1>
        <p className="page-subtitle">
          Explore React&apos;s functional reactivity models—contrasting <code>useState</code> and{' '}
          <code>useReducer</code> against Angular&apos;s Signals and RxJS Services.
        </p>
      </div>

      <div className="lab-section">
        <div className="lab-header">
          <h2>1. Primitive State with <code>useState</code></h2>
          <p className="section-desc">
            In React, state changes trigger functional re-renders. Unlike Angular&apos;s mutable two-way binding, React enforces immutable state updates.
          </p>
        </div>

        <div className="state-playground">
          <div className="counter-display-box">
            <span className="counter-label">Current Value</span>
            <span className="counter-large">{count}</span>
            <div className="step-selector">
              <span className="step-label">Step Size:</span>
              {[1, 5, 10].map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`step-btn ${step === s ? 'active' : ''}`}
                  onClick={() => setStep(s)}
                >
                  ±{s}
                </button>
              ))}
            </div>
            <div className="counter-actions">
              <button
                type="button"
                className="counter-btn"
                onClick={() => updateCount(-step)}
              >
                -{step}
              </button>
              <button
                type="button"
                className="counter-btn"
                onClick={() => updateCount(step)}
              >
                +{step}
              </button>
              <button
                type="button"
                className="reset-btn"
                onClick={handleReset}
                disabled={count === 0}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="inspector-box">
            <h3>State History (Recent 10)</h3>
            {history.length === 0 ? (
              <p className="empty-state">No state transitions recorded yet.</p>
            ) : (
              <ul className="history-list">
                {history.map((entry) => (
                  <li key={entry.id} className="history-item">
                    <span className="history-time">{entry.timestamp}</span>
                    <span className="history-action">{entry.action}</span>
                    <span className="history-value">Result: {entry.value}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="lab-section" style={{ marginTop: '2.5rem' }}>
        <div className="lab-header">
          <h2>2. Complex State with <code>useReducer</code></h2>
          <p className="section-desc">
            For actions that involve multiple sub-values or complex logic (similar to NgRx actions or reducer pipelines in Angular), <code>useReducer</code> provides predictable state transitions.
          </p>
        </div>

        <div className="reducer-playground">
          <div className="cart-container">
            <div className="cart-header">
              <h3>Shopping Cart ({totalItems} items)</h3>
              {cart.length > 0 && (
                <button
                  type="button"
                  className="reset-btn"
                  onClick={() => dispatch({ type: 'CLEAR' })}
                >
                  Clear All
                </button>
              )}
            </div>

            <form onSubmit={handleAddItem} className="add-item-form">
              <input
                type="text"
                placeholder="Add learning resource..."
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="text-input"
              />
              <button type="submit" className="counter-btn" disabled={!newItemName.trim()}>
                Add Resource
              </button>
            </form>

            {cart.length === 0 ? (
              <p className="empty-state">Cart is empty. Add a resource above.</p>
            ) : (
              <ul className="cart-list">
                {cart.map((item) => (
                  <li key={item.id} className="cart-item">
                    <span className="cart-item-name">{item.name}</span>
                    <div className="cart-controls">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => dispatch({ type: 'DECREMENT', payload: { id: item.id } })}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="cart-item-qty">{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => dispatch({ type: 'INCREMENT', payload: { id: item.id } })}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => dispatch({ type: 'REMOVE', payload: { id: item.id } })}
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

          <div className="inspector-box">
            <h3>Live Reducer State Inspector</h3>
            <pre className="json-inspector">
              {JSON.stringify(cart, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
