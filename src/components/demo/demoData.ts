import type { DemoMove, DemoProgress, DemoCategory } from './types';

export const categories: DemoCategory[] = [
  { id: 'pull', name: 'Pull', color: '#3b82f6' },
  { id: 'push', name: 'Push', color: '#ef4444' },
  { id: 'core', name: 'Core', color: '#f59e0b' },
];

export const skills: DemoMove[] = [
  // ── Pull ──
  { id: 'dead-hang', name: 'Dead Hang', categoryId: 'pull', requires: [], progressions: 3 },
  {
    id: 'active-hang',
    name: 'Active Hang',
    categoryId: 'pull',
    requires: ['dead-hang'],
    progressions: 3,
  },
  {
    id: 'pull-up',
    name: 'Pull-up',
    categoryId: 'pull',
    requires: ['active-hang'],
    progressions: 5,
  },
  {
    id: 'chest-to-bar',
    name: 'Chest-to-bar',
    abbr: 'C2B Pull-up',
    categoryId: 'pull',
    requires: ['pull-up'],
    progressions: 4,
  },
  {
    id: 'muscle-up',
    name: 'Muscle-up',
    categoryId: 'pull',
    requires: ['chest-to-bar'],
    progressions: 5,
  },
  {
    id: 'l-hang',
    name: 'L-hang',
    categoryId: 'pull',
    requires: ['active-hang'],
    progressions: 3,
  },

  // ── Push ──
  { id: 'push-up', name: 'Push-up', categoryId: 'push', requires: [], progressions: 3 },
  {
    id: 'diamond-pu',
    name: 'Diamond PU',
    categoryId: 'push',
    requires: ['push-up'],
    progressions: 3,
  },
  {
    id: 'pike-pu',
    name: 'Pike PU',
    categoryId: 'push',
    requires: ['diamond-pu'],
    progressions: 3,
  },
  {
    id: 'hspu',
    name: 'HSPU',
    categoryId: 'push',
    requires: ['pike-pu'],
    progressions: 5,
  },
  {
    id: 'pseudo-planche-pu',
    name: 'Pseudo Planche PU',
    abbr: 'PPPU',
    categoryId: 'push',
    requires: ['push-up'],
    progressions: 5,
  },
  {
    id: 'planche-lean',
    name: 'Planche Lean',
    categoryId: 'push',
    requires: ['pseudo-planche-pu'],
    progressions: 4,
  },

  // ── Core ──
  { id: 'plank', name: 'Plank', categoryId: 'core', requires: [], progressions: 3 },
  {
    id: 'hollow-body',
    name: 'Hollow Body',
    categoryId: 'core',
    requires: ['plank'],
    progressions: 3,
  },
  {
    id: 'l-sit',
    name: 'L-sit',
    categoryId: 'core',
    requires: ['hollow-body'],
    progressions: 4,
  },
  {
    id: 'v-sit',
    name: 'V-sit',
    categoryId: 'core',
    requires: ['l-sit'],
    progressions: 5,
  },
  {
    id: 'side-plank',
    name: 'Side Plank',
    categoryId: 'core',
    requires: ['plank'],
    progressions: 2,
  },
  {
    id: 'human-flag',
    name: 'Human Flag',
    categoryId: 'core',
    requires: ['side-plank'],
    progressions: 5,
  },
];

// Stored progress (unlocked is computed, not stored)
export const progress: Record<string, DemoProgress> = {
  // Pull
  'dead-hang': { status: 'mastered', currentStep: 3 },
  'active-hang': { status: 'mastered', currentStep: 3 },
  'pull-up': { status: 'completed', currentStep: 5 },
  'chest-to-bar': { status: 'in_progress', currentStep: 2 },
  'muscle-up': { status: 'locked', currentStep: 0 },
  'l-hang': { status: 'in_progress', currentStep: 1 },

  // Push
  'push-up': { status: 'mastered', currentStep: 3 },
  'diamond-pu': { status: 'completed', currentStep: 3 },
  'pike-pu': { status: 'completed', currentStep: 3 },
  hspu: { status: 'locked', currentStep: 0 },
  'pseudo-planche-pu': { status: 'in_progress', currentStep: 2 },
  'planche-lean': { status: 'locked', currentStep: 0 },

  // Core
  plank: { status: 'mastered', currentStep: 3 },
  'hollow-body': { status: 'completed', currentStep: 3 },
  'l-sit': { status: 'in_progress', currentStep: 2 },
  'v-sit': { status: 'locked', currentStep: 0 },
  'side-plank': { status: 'completed', currentStep: 2 },
  'human-flag': { status: 'locked', currentStep: 0 },
};
