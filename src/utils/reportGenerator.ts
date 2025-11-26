import { AdminState } from '../context/SimulationContext';
import { UserIdentity } from './identityCalculator';

export interface IdentityChange {
  metric: string;
  change: number;
  direction: 'increased' | 'decreased' | 'stable';
}

export function generateIdentityLabel(identity: UserIdentity, adminState: AdminState): string {
  const labels: string[] = [];

  if (identity.nationalism > 70) labels.push('Patriotic');
  if (identity.radicalization > 60) labels.push('Polarized');
  if (identity.screenTimeAddiction > 70) labels.push('Super-Scroller');
  if (identity.consumerism > 70) labels.push('Consumer');
  if (identity.anxiety > 70) labels.push('Anxious');

  if (adminState.strongLeaderContent && identity.radicalization > 50) {
    labels.push('Authority-Seeking');
  }

  if (adminState.outrageBoost > 60 && identity.radicalization > 50) {
    labels.push('Outrage-Driven');
  }

  if (labels.length === 0) {
    return 'Baseline User';
  }

  return labels.join(' ');
}

export function getAvatarStyle(identity: UserIdentity): {
  emoji: string;
  borderColor: string;
  filterClass: string;
} {
  if (identity.radicalization > 70) {
    return {
      emoji: '😤',
      borderColor: 'border-red-500',
      filterClass: 'saturate-150 hue-rotate-15',
    };
  }

  if (identity.anxiety > 70) {
    return {
      emoji: '😰',
      borderColor: 'border-yellow-500',
      filterClass: 'saturate-50 brightness-90',
    };
  }

  if (identity.nationalism > 70) {
    return {
      emoji: '🦅',
      borderColor: 'border-blue-500',
      filterClass: 'saturate-150 contrast-125',
    };
  }

  if (identity.screenTimeAddiction > 70) {
    return {
      emoji: '📱',
      borderColor: 'border-purple-500',
      filterClass: 'saturate-150 brightness-110',
    };
  }

  if (identity.consumerism > 70) {
    return {
      emoji: '💰',
      borderColor: 'border-green-500',
      filterClass: 'saturate-150 hue-rotate-90',
    };
  }

  return {
    emoji: '😊',
    borderColor: 'border-gray-500',
    filterClass: '',
  };
}

export function calculateOppositionVisibility(adminState: AdminState): number {
  let visibility = 50;

  visibility -= adminState.censorshipLevel * 0.5;
  if (adminState.proAmericanContent) visibility -= 15;
  if (adminState.antiForeignPlatforms) visibility -= 20;
  if (adminState.strongLeaderContent) visibility -= 10;

  return Math.max(0, Math.min(100, Math.round(visibility)));
}
