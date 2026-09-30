import type { CartItem } from '../../types/state.ts'

interface CartInspectorProps {
  cart: CartItem[]
}

export function CartInspector({ cart }: CartInspectorProps) {
  return (
    <div className="inspector-box">
      <h3>Live Reducer State Inspector</h3>
      <pre className="json-inspector">{JSON.stringify(cart, null, 2)}</pre>
    </div>
  )
}
