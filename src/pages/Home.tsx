import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.png'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import './Pages.css'

export function Home() {
  const labModules = [
    {
      title: 'Interactive State Management',
      path: '/state',
      badge: 'Hooks & Reducers',
      description:
        'Hands-on state management lab demonstrating useState, step modifiers, transition history, and multi-action useReducer workflows.',
      actionText: 'Launch State Lab →',
    },
    {
      title: 'Client-Side Routing',
      path: '/routing',
      badge: 'React Router',
      description:
        'Explore declarative route handling, dynamic URL search params synchronization with useSearchParams, and programmatic navigation.',
      actionText: 'Launch Routing Lab →',
    },
    {
      title: 'Angular to React Migration Guide',
      path: '/angular-to-react',
      badge: 'Code Comparator',
      description:
        'Interactive side-by-side pattern converter comparing templates (*ngIf, *ngFor), Signals, Dependency Injection, and Lifecycle hooks.',
      actionText: 'Open Migration Guide →',
    },
    {
      title: 'Architectural Foundations',
      path: '/about',
      badge: 'Core Concepts',
      description:
        'Deep-dive into declarative UI paradigms, component composition, unidirectional data flow, and modern React 19 compiler benefits.',
      actionText: 'Explore Architecture →',
    },
  ]

  return (
    <div className="page-wrapper">
      <div className="hero-section">
        <div className="hero-logos">
          <img src={heroImg} className="base-hero" width="140" height="147" alt="Hero background" />
          <img src={reactLogo} className="framework-logo" alt="React logo" />
          <img src={viteLogo} className="vite-logo" alt="Vite logo" />
        </div>
        <h1 className="page-title">Angular to React Lab</h1>
        <p className="page-subtitle">
          A dedicated interactive learning workspace designed for Angular developers mastering modern React patterns, hooks, and routing architecture.
        </p>
      </div>

      <div className="lab-overview-section">
        <div className="overview-header">
          <h2>Interactive Lab Modules</h2>
          <p className="section-desc">
            Each navigation path below provides a focused, single-feature lab environment designed to maximize practical comprehension.
          </p>
        </div>

        <div className="card-grid">
          {labModules.map((module) => (
            <div key={module.path} className="feature-card hub-card">
              <div className="card-top">
                <span className="badge">{module.badge}</span>
              </div>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <div className="card-footer-action">
                <Link to={module.path} className="counter-btn hub-btn">
                  {module.actionText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
