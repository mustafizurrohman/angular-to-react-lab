import type { LabModule } from '../types/home.ts'

export const LAB_MODULES: LabModule[] = [
  {
    title: 'Exhaustive Feature Checklist Matrix',
    path: '/features',
    badge: '35 Framework Domains',
    description:
      'Complete feature-level checklist mapping Angular (Signals, @defer, DI, CDK, Zoneless) directly to React 19 equivalents with SOLID principle notes.',
    actionText: 'Explore Feature Matrix →',
  },
  {
    title: 'Angular to React Migration Guide',
    path: '/angular-to-react',
    badge: 'Code Comparator',
    description:
      'Side-by-side pattern converter comparing templates, modern control flow, reactive signals, lifecycle, dependency injection, and guards.',
    actionText: 'Open Migration Guide →',
  },
  {
    title: 'Interactive State Management',
    path: '/state',
    badge: 'Hooks & Reducers',
    description:
      'Hands-on state management lab demonstrating useState, step modifiers, transition history, and multi-action useReducer workflows.',
    actionText: 'Launch State Lab →',
  },
  {
    title: 'Reactive Forms & Validation',
    path: '/forms',
    badge: 'FormArray & Async Validators',
    description:
      'Dynamic FormArray collections, cross-field sync validation, and debounce-driven async validators compared with Angular ReactiveFormsModule.',
    actionText: 'Launch Forms Lab →',
  },
  {
    title: 'HTTP Client & Interceptors',
    path: '/http',
    badge: 'Fetch Pipeline & AbortController',
    description:
      'Functional interceptors, Authorization token injection, latency simulation, error handling, and request cancellation with AbortController.',
    actionText: 'Launch HTTP Lab →',
  },
  {
    title: 'Control Flow & Deferred Loading',
    path: '/control-flow',
    badge: '@if, @for, @defer vs Suspense',
    description:
      'Modern iteration variables ($index, $count, $first), @empty state blocks, and @defer triggers (viewport, interaction, timer, error) vs React Suspense.',
    actionText: 'Launch Control Flow Lab →',
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
    title: 'Architectural Foundations & SOLID',
    path: '/about',
    badge: 'Core Principles',
    description:
      'Deep-dive into SOLID design principles in modern frontend architectures, declarative UI paradigms, and React 19 compiler optimizations.',
    actionText: 'Explore Architecture →',
  },
]
