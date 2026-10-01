import type { NavItemConfig } from '../types/navigation.ts'

export const NAVIGATION_ITEMS: NavItemConfig[] = [
  {
    to: '/',
    label: 'Home',
    icon: 'house',
    end: true,
  },
  {
    to: '/state',
    label: 'Interactive State',
    icon: 'cpu',
  },
  {
    to: '/routing',
    label: 'Client-Side Routing',
    icon: 'compass',
  },
  {
    to: '/angular-to-react',
    label: 'Angular to React',
    icon: 'arrows-left-right',
  },
  {
    to: '/about',
    label: 'About',
    icon: 'info',
  },
]
