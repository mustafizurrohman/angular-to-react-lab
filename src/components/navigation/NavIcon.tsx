import { Icon, type IconName } from '../common/Icon.tsx'

interface NavIconProps {
  icon: string
}

export function NavIcon({ icon }: NavIconProps) {
  return <Icon name={icon as IconName} className="nav-icon" size={18} />
}
