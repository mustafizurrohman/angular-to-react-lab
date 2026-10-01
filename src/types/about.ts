import type { IconName } from '../components/common/Icon.tsx'

export interface ArchitecturalPrinciple {
  title: string
  icon: IconName
  description: string
}

export interface SolidArchitecturePrinciple {
  principle: 'SRP' | 'OCP' | 'LSP' | 'ISP' | 'DIP'
  title: string
  angularApproach: string
  reactApproach: string
  description: string
}

export interface MigrationStep {
  step: string
  title: string
  detail: string
}
