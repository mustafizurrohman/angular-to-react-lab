import type { NavItemConfig } from '../types/navigation.ts'

export const NAVIGATION_ITEMS: NavItemConfig[] = [
  {
    to: '/',
    label: 'Home',
    icon: 'home',
    end: true,
  },
  {
    to: '/state',
    label: 'Interactive State',
    icon: 'state',
  },
  {
    to: '/routing',
    label: 'Client-Side Routing',
    icon: 'routing',
  },
  {
    to: '/angular-to-react',
    label: 'Angular to React',
    icon: 'migration',
  },
  {
    to: '/about',
    label: 'About',
    icon: 'about',
  },
]
