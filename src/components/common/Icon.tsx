import type { ComponentType, CSSProperties } from 'react'
import type { IconProps as PhosphorIconProps, IconWeight } from '@phosphor-icons/react'
import {
  Atom,
  House,
  Cpu,
  Compass,
  ArrowsLeftRight,
  Info,
  User,
  SignOut,
  WarningCircle,
  Warning,
  List,
  X,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Trash,
  PuzzlePiece,
  Waves,
  Lightning,
  RocketLaunch,
  MagnifyingGlass,
  Sparkle,
} from '@phosphor-icons/react'

export type IconName =
  | 'atom'
  | 'home'
  | 'state'
  | 'routing'
  | 'migration'
  | 'about'
  | 'user'
  | 'logout'
  | 'sign-out'
  | 'warning-circle'
  | 'warning'
  | 'menu'
  | 'close'
  | 'copy'
  | 'check'
  | 'arrow-right'
  | 'arrow-left'
  | 'plus'
  | 'minus'
  | 'trash'
  | 'puzzle'
  | 'waves'
  | 'lightning'
  | 'rocket'
  | 'search'
  | 'sparkle'

export interface AppIconProps {
  name: IconName
  size?: number | string
  weight?: IconWeight
  color?: string
  className?: string
  style?: CSSProperties
  'aria-hidden'?: boolean | 'true' | 'false'
  'aria-label'?: string
}

export const ICON_REGISTRY: Record<IconName, ComponentType<PhosphorIconProps>> = {
  atom: Atom,
  home: House,
  state: Cpu,
  routing: Compass,
  migration: ArrowsLeftRight,
  about: Info,
  user: User,
  logout: SignOut,
  'sign-out': SignOut,
  'warning-circle': WarningCircle,
  warning: Warning,
  menu: List,
  close: X,
  copy: Copy,
  check: Check,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  plus: Plus,
  minus: Minus,
  trash: Trash,
  puzzle: PuzzlePiece,
  waves: Waves,
  lightning: Lightning,
  rocket: RocketLaunch,
  search: MagnifyingGlass,
  sparkle: Sparkle,
}

export function Icon({
  name,
  size = 20,
  weight = 'regular',
  color,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  'aria-label': ariaLabel,
}: AppIconProps) {
  const Component = ICON_REGISTRY[name]
  if (!Component) {
    return null
  }
  return (
    <Component
      size={size}
      weight={weight}
      color={color}
      className={className}
      style={style}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
    />
  )
}
