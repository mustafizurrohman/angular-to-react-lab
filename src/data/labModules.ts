import type { LabModule } from '../types/home.ts'

export const LAB_MODULES: LabModule[] = [
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
