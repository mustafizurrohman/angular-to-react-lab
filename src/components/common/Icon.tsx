import { createElement } from 'react';
import type { CSSProperties, ElementType } from 'react';
import type { IconProps, IconWeight } from '@phosphor-icons/react';
import * as PhosphorIcons from '@phosphor-icons/react';

type PhosphorIconComponent = ElementType<IconProps>;

const ICON_ALIASES = {
  home: 'House',
  state: 'Cpu',
  routing: 'Compass',
  migration: 'ArrowsLeftRight',
  about: 'Info',
  logout: 'SignOut',
  'sign-out': 'SignOut',
  menu: 'List',
  close: 'X',
  puzzle: 'PuzzlePiece',
  rocket: 'RocketLaunch',
  search: 'MagnifyingGlass',
} as const;

export type IconName = string;

export interface AppIconProps {
  name: IconName;
  size?: number | string;
  weight?: IconWeight;
  color?: string;
  className?: string;
  style?: CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
  'aria-label'?: string;
}

function toPascalCase(name: string): string {
  return name
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
}

function resolveIcon(name: IconName): PhosphorIconComponent | null {
  const iconName =
      ICON_ALIASES[name as keyof typeof ICON_ALIASES] ??
      toPascalCase(name);

  const icon = (PhosphorIcons as Record<string, unknown>)[iconName];

  return typeof icon === 'function' || (typeof icon === 'object' && icon !== null)
      ? (icon as PhosphorIconComponent)
      : null;
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
  const icon = resolveIcon(name);

  if (!icon) {
    return null;
  }

  return createElement(icon, {
    size,
    weight,
    color,
    className,
    style,
    'aria-hidden': ariaHidden,
    'aria-label': ariaLabel,
  });
}