import './Pages.css'

export function About() {
  const architecturalPrinciples = [
    {
      title: 'Component-Driven Design & Composition',
      icon: '🧩',
      description:
        'In React, components are first-class JavaScript functions returning JSX. Instead of class hierarchies and NgModule declarations, React relies on function composition and custom hooks for maximum code reuse and testability.',
    },
    {
      title: 'Unidirectional Data Flow',
      icon: '🌊',
      description:
        'Data flows strictly downwards via immutable props, and state changes propagate upwards through event callbacks. This single-source-of-truth flow eliminates unexpected side effects common in complex two-way binding graphs.',
    },
    {
      title: 'Declarative UI over DOM Manipulation',
      icon: '⚡',
      description:
        'React renders the interface as a pure projection of current state and props. Developers declare what the UI should look like at any point in time, and React handles efficient reconciliation and DOM mutation.',
    },
    {
      title: 'Modern React 19 & Compiler Optimizations',
      icon: '🚀',
      description:
        'With React 19 and the React Compiler, manual memoization (useMemo, useCallback) is automatically managed at compile time, eliminating boilerplate while guaranteeing peak performance.',
    },
  ]

  const migrationSteps = [
    {
      step: '01',
      title: 'Deconstruct Class Architecture',
      detail: 'Convert Angular @Component classes and lifecycle methods into functional components and useEffect hooks.',
    },
    {
      step: '02',
      title: 'Adopt Immutable State',
      detail: 'Replace mutable class fields and BehaviorSubject instances with useState, useReducer, and React Context.',
    },
    {
      step: '03',
      title: 'Transition Routing to Declarative Routes',
      detail: 'Migrate Angular RouterModule configuration to React Router Routes, Route, and Outlet components.',
    },
    {
      step: '04',
      title: 'Embrace Custom Hooks for Logic Sharing',
      detail: 'Replace Injectable singleton services with custom React hooks to encapsulate and share stateful business logic.',
    },
  ]

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">Architectural Foundations</h1>
        <p className="page-subtitle">
          Core paradigms, design patterns, and migration strategies for engineers transitioning from Angular to React.
        </p>
      </div>

      <div className="lab-section">
        <div className="lab-header">
          <h2>Core React Paradigms</h2>
          <p className="section-desc">
            Understanding the core mental model differences ensures productive code organization and clean component architecture.
          </p>
        </div>

        <div className="card-grid">
          {architecturalPrinciples.map((item, index) => (
            <div key={index} className="feature-card">
              <div className="principle-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="lab-section" style={{ marginTop: '2.5rem' }}>
        <div className="lab-header">
          <h2>Recommended Migration Roadmap</h2>
          <p className="section-desc">
            A battle-tested incremental migration pathway for Angular engineering teams transitioning to React.
          </p>
        </div>

        <div className="roadmap-grid">
          {migrationSteps.map((s) => (
            <div key={s.step} className="roadmap-card">
              <span className="roadmap-step">{s.step}</span>
              <div className="roadmap-content">
                <h4>{s.title}</h4>
                <p>{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
