export interface NavItemConfig {
  to: string
  label: string
  icon: 'home' | 'state' | 'routing' | 'migration' | 'about'
  end?: boolean
}
