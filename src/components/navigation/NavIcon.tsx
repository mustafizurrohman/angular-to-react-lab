import { Icon, type IconName } from '../common/Icon.tsx'

interface NavIconProps {
  icon: 'house' | 'cpu' | 'compass' | 'arrows-left-right' | 'info'
}

export function NavIcon({ icon }: NavIconProps) {
  return <Icon name={icon as IconName} className="nav-icon" size={18} />
}
