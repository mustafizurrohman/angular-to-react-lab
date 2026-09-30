import { useCounterWithHistory } from '../hooks/useCounterWithHistory.ts'
import { useCart } from '../hooks/useCart.ts'
import { PageHeader } from '../components/common/PageHeader.tsx'
import { SectionHeader } from '../components/common/SectionHeader.tsx'
import { CounterPlayground } from '../components/state/CounterPlayground.tsx'
import { StateHistoryInspector } from '../components/state/StateHistoryInspector.tsx'
import { CartPlayground } from '../components/state/CartPlayground.tsx'
import { CartInspector } from '../components/state/CartInspector.tsx'
import './Pages.css'

export function StateLab() {
  const { count, step, history, setStep, updateCount, handleReset } = useCounterWithHistory()
  const {
    cart,
    newItemName,
    setNewItemName,
    totalItems,
    handleAddItem,
    increment,
    decrement,
    removeItem,
    clearCart,
  } = useCart()

  return (
    <div className="page-wrapper">
      <PageHeader
        title="Interactive State Management"
        subtitle={
          <>
            Explore React&apos;s functional reactivity models—contrasting <code>useState</code> and{' '}
            <code>useReducer</code> against Angular&apos;s Signals and RxJS Services.
          </>
        }
      />

      <div className="lab-section">
        <SectionHeader
          title={
            <>
              1. Primitive State with <code>useState</code>
            </>
          }
          description="In React, state changes trigger functional re-renders. Unlike Angular's mutable two-way binding, React enforces immutable state updates."
        />

        <div className="state-playground">
          <CounterPlayground
            count={count}
            step={step}
            onStepChange={setStep}
            onUpdateCount={updateCount}
            onReset={handleReset}
          />
          <StateHistoryInspector history={history} />
        </div>
      </div>

      <div className="lab-section" style={{ marginTop: '2.5rem' }}>
        <SectionHeader
          title={
            <>
              2. Complex State with <code>useReducer</code>
            </>
          }
          description={
            <>
              For actions that involve multiple sub-values or complex logic (similar to NgRx actions or reducer pipelines in Angular), <code>useReducer</code> provides predictable state transitions.
            </>
          }
        />

        <div className="reducer-playground">
          <CartPlayground
            cart={cart}
            newItemName={newItemName}
            totalItems={totalItems}
            onNewItemNameChange={setNewItemName}
            onAddItem={handleAddItem}
            onIncrement={increment}
            onDecrement={decrement}
            onRemove={removeItem}
            onClear={clearCart}
          />
          <CartInspector cart={cart} />
        </div>
      </div>
    </div>
  )
}
