import type { NavItemConfig } from '../types/navigation.ts'

export const NAVIGATION_ITEMS: NavItemConfig[] = [
  {
    to: '/',
    label: 'Home',
    icon: 'house',
    end: true,
  },
  {
    to: '/features',
    label: 'Feature Matrix',
    icon: 'list-checks',
  },
  {
    to: '/angular-to-react',
    label: 'Migration Guide',
    icon: 'arrows-left-right',
  },
  {
    to: '/state',
    label: 'Interactive State',
    icon: 'cpu',
  },
  {
    to: '/forms',
    label: 'Forms & Validation',
    icon: 'check-square',
  },
  {
    to: '/http',
    label: 'HTTP & Interceptors',
    icon: 'plugs-connected',
  },
  {
    to: '/control-flow',
    label: 'Control Flow & Defer',
    icon: 'lightning',
  },
  {
    to: '/routing',
    label: 'Client-Side Routing',
    icon: 'compass',
  },
  {
    to: '/about',
    label: 'Architecture & SOLID',
    icon: 'info',
  },
]
