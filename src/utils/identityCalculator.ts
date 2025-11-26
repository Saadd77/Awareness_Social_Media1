import { AdminState } from '../context/SimulationContext';

export interface UserIdentity {
  radicalization: number;
  nationalism: number;
  consumerism: number;
  anxiety: number;
  screenTimeAddiction: number;
}

export function calculateUserIdentity(adminState: AdminState): UserIdentity {
  let radicalization = 20;
  let nationalism = 15;
  let consumerism = 30;
  let anxiety = 25;
  let screenTimeAddiction = 35;

  if (adminState.proAmericanContent) radicalization += 15;
  if (adminState.strongLeaderContent) radicalization += 20;
  if (adminState.antiForeignPlatforms) radicalization += 10;

  radicalization += Math.floor(adminState.outrageBoost * 0.6);
  radicalization += Math.floor(adminState.censorshipLevel * 0.3);

  nationalism += adminState.nationalismLevel;
  if (adminState.proAmericanContent) nationalism += 20;
  if (adminState.nationalPride) nationalism += 25;
  if (adminState.antiForeignPlatforms) nationalism += 15;

  consumerism += Math.floor(adminState.influencerObsession * 0.8);
  if (adminState.wealthFlexing) consumerism += 25;
  consumerism += Math.floor(adminState.emotionalManipulation * 0.4);

  anxiety += Math.floor(adminState.outrageBoost * 0.7);
  anxiety += Math.floor(adminState.screenTimeBoost * 0.5);
  anxiety += Math.floor(adminState.emotionalManipulation * 0.6);
  if (adminState.shortClipPriority) anxiety += 15;

  screenTimeAddiction += adminState.screenTimeBoost;
  screenTimeAddiction += Math.floor(adminState.influencerObsession * 0.5);
  if (adminState.shortClipPriority) screenTimeAddiction += 20;
  screenTimeAddiction += Math.floor(adminState.emotionalManipulation * 0.3);

  return {
    radicalization: Math.min(100, Math.max(0, radicalization)),
    nationalism: Math.min(100, Math.max(0, nationalism)),
    consumerism: Math.min(100, Math.max(0, consumerism)),
    anxiety: Math.min(100, Math.max(0, anxiety)),
    screenTimeAddiction: Math.min(100, Math.max(0, screenTimeAddiction)),
  };
}

export function getActiveDirective(adminState: AdminState): string {
  const directives = [];

  if (adminState.proAmericanContent) directives.push('Pro-American Boost');
  if (adminState.antiForeignPlatforms) directives.push('Anti-Foreign');
  if (adminState.strongLeaderContent) directives.push('Strong Leader');
  if (adminState.wealthFlexing) directives.push('Wealth Display');
  if (adminState.nationalPride) directives.push('National Pride');
  if (adminState.shortClipPriority) directives.push('Short-Clip Priority');

  if (adminState.outrageBoost > 50) directives.push('High Outrage');
  if (adminState.screenTimeBoost > 60) directives.push('Max Engagement');
  if (adminState.censorshipLevel > 50) directives.push('Heavy Censorship');

  return directives.length > 0 ? directives.join(', ') : 'Baseline Algorithm';
}
