import type { RouteCategory, RouteDemoItem } from '../types/routing.ts'

export const ROUTING_DEMO_ITEMS: RouteDemoItem[] = [
  {
    id: '1',
    title: 'Declarative Routes',
    category: 'routing',
    description: 'Routes configured via <Routes> and <Route> JSX components instead of NgModule route tables.',
  },
  {
    id: '2',
    title: 'Programmatic Navigation',
    category: 'routing',
    description: 'useNavigate hook replaces Angular Router service navigate() calls with a cleaner, dependency-free API.',
  },
  {
    id: '3',
    title: 'Search Query Parameters',
    category: 'routing',
    description: 'useSearchParams synchronizes UI state with browser URL search query strings seamlessly.',
  },
  {
    id: '4',
    title: 'Component State',
    category: 'state',
    description: 'useState and useReducer provide local reactive primitives replacing component property binding.',
  },
  {
    id: '5',
    title: 'Effect Hooks',
    category: 'lifecycle',
    description: 'useEffect synchronizes with external systems, unifying ngOnInit, ngOnChanges, and ngOnDestroy.',
  },
  {
    id: '6',
    title: 'Functional Components',
    category: 'core',
    description: 'Pure functions returning JSX replace class-based components decorated with @Component.',
  },
]

export const ROUTING_CATEGORIES: { id: RouteCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'routing', label: 'Routing' },
  { id: 'state', label: 'State' },
  { id: 'lifecycle', label: 'Lifecycle' },
  { id: 'core', label: 'Core' },
]

export const SORT_OPTIONS: { value: 'name-asc' | 'name-desc'; label: string }[] = [
  { value: 'name-asc', label: 'Title: A to Z' },
  { value: 'name-desc', label: 'Title: Z to A' },
]
