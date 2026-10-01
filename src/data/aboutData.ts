import type { ArchitecturalPrinciple, MigrationStep, SolidArchitecturePrinciple } from '../types/about.ts'

export const ARCHITECTURAL_PRINCIPLES: ArchitecturalPrinciple[] = [
  {
    title: 'Component-Driven Design & Composition',
    icon: 'puzzle-piece',
    description:
      'In React, components are first-class JavaScript functions returning JSX. Instead of class hierarchies and NgModule declarations, React relies on function composition and custom hooks for maximum code reuse and testability.',
  },
  {
    title: 'Unidirectional Data Flow',
    icon: 'waves',
    description:
      'Data flows strictly downwards via immutable props, and state changes propagate upwards through event callbacks. This single-source-of-truth flow eliminates unexpected side effects common in complex two-way binding graphs.',
  },
  {
    title: 'Declarative UI over DOM Manipulation',
    icon: 'lightning',
    description:
      'React renders the interface as a pure projection of current state and props. Developers declare what the UI should look like at any point in time, and React handles efficient reconciliation and DOM mutation.',
  },
  {
    title: 'Modern React 19 & Compiler Optimizations',
    icon: 'rocket-launch',
    description:
      'With React 19 and the React Compiler, manual memoization (useMemo, useCallback) is automatically managed at compile time, eliminating boilerplate while guaranteeing peak performance.',
  },
]

export const SOLID_PRINCIPLES_LIST: SolidArchitecturePrinciple[] = [
  {
    principle: 'SRP',
    title: 'Single Responsibility Principle',
    angularApproach: 'Separates components (view), services (business logic/data), and pipes (formatting) into distinct decorated classes.',
    reactApproach: 'Separates pure presentational components, custom hooks for state orchestration, and standalone utility functions.',
    description: 'A component or module should have one, and only one, reason to change. Decoupling view rendering from state management ensures focused, maintainable units.',
  },
  {
    principle: 'OCP',
    title: 'Open/Closed Principle',
    angularApproach: 'Extends functionality via hostDirectives, router resolvers, and custom structural directives (*ngTemplateOutlet).',
    reactApproach: 'Extends functionality via Component Composition (children, render props, slot props), Higher-Order Components, and hook composition.',
    description: 'Software entities should be open for extension, but closed for modification. Composable components allow wrapping new behaviors without modifying existing component internals.',
  },
  {
    principle: 'LSP',
    title: 'Liskov Substitution Principle',
    angularApproach: 'Injectable abstract services or interface tokens can be substituted in providers array without breaking consumers.',
    reactApproach: 'Components adhering to standard ReactNode prop contracts or standard Context interfaces can be swapped interchangeably.',
    description: 'Subtypes or alternative implementations must be substitutable for their base types without altering program correctness.',
  },
  {
    principle: 'ISP',
    title: 'Interface Segregation Principle',
    angularApproach: 'Components define granular @Input() / input() properties and discrete @Output() event emitters.',
    reactApproach: 'Components define minimal, segregated TypeScript prop interfaces rather than forcing consumers to pass oversized monolithic objects.',
    description: 'Clients should not be forced to depend upon interfaces or props that they do not use.',
  },
  {
    principle: 'DIP',
    title: 'Dependency Inversion Principle',
    angularApproach: 'Hierarchical IoC container injects dependencies through constructor or inject(InjectionToken).',
    reactApproach: 'Context Providers (createContext / useContext) and custom hooks inject abstract capabilities down the component tree.',
    description: 'High-level modules should not depend on low-level modules; both should depend on abstractions.',
  },
]

export const MIGRATION_STEPS: MigrationStep[] = [
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
