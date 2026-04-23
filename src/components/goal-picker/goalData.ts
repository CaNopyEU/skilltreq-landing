export interface LandingGoal {
  slug: string;
  image: string;
  libraryId: string;
  path: string[];
  /** Node IDs in the library's demo tree — for path highlighting */
  demoNodeIds: string[];
}

export const FEATURED_GOALS: LandingGoal[] = [
  // ── Calisthenics ──
  {
    slug: 'muscle-up',
    image: '/images/goals/muscle-up.webp',
    libraryId: 'calisthenics',
    path: ['Ring Row', 'Pull-up', 'Support', 'Ring Dip', 'Muscle-up'],
    demoNodeIds: ['ring-row', 'ring-pull-up', 'ring-support', 'ring-dip', 'ring-mu'],
  },
  {
    slug: 'planche',
    image: '/images/goals/planche.webp',
    libraryId: 'calisthenics',
    path: ['Support', 'Ring Push-up', 'PPPU', 'Tuck Planche'],
    demoNodeIds: ['ring-support', 'ring-push-up', 'ring-pppu', 'tuck-planche'],
  },

  // ── Mobility ──
  {
    slug: 'front-split',
    image: '/images/goals/front-split.webp',
    libraryId: 'mobility',
    path: ['90/90 Stretch', 'Pigeon Pose', 'Hip PAILs/RAILs', 'Front Split'],
    demoNodeIds: ['90-90-stretch', 'pigeon-pose', 'hip-pails-rails', 'front-split'],
  },
  {
    slug: 'bridge',
    image: '/images/goals/bridge.webp',
    libraryId: 'mobility',
    path: ['Cat-Cow', 'Jefferson Curl', 'Shoulder CARs', 'Full Bridge'],
    demoNodeIds: ['cat-cow', 'jefferson-curl', 'shoulder-cars', 'full-bridge'],
  },

  // ── Acrobatics ──
  {
    slug: 'aerial-cartwheel',
    image: '/images/goals/aerial-cartwheel.webp',
    libraryId: 'acrobatics',
    path: ['Cartwheel', 'One-Hand Cartwheel', 'Aerial'],
    demoNodeIds: ['tmb-cartwheel', 'tmb-one-hand-cw', 'tmb-aerial'],
  },
  {
    slug: 'backflip',
    image: '/images/goals/backflip.webp',
    libraryId: 'acrobatics',
    path: ['Cartwheel', 'Round-off', 'Bridge', 'Back Handspring', 'Backflip'],
    demoNodeIds: ['tmb-cartwheel', 'tmb-round-off', 'tmb-bridge', 'tmb-bhs', 'tmb-back-tuck'],
  },

  // ── Kickboxing ──
  {
    slug: 'roundhouse-kick',
    image: '/images/goals/roundhouse-kick.webp',
    libraryId: 'kickboxing',
    path: ['Fighting Stance', 'Front Kick', 'Roundhouse Kick'],
    demoNodeIds: ['kb-stance', 'kb-front-kick', 'kb-roundhouse'],
  },
  {
    slug: 'jab-cross-hook',
    image: '/images/goals/jab-cross-hook.webp',
    libraryId: 'kickboxing',
    path: ['Fighting Stance', 'Jab', 'Cross', 'Hook', 'Jab-Cross-Hook'],
    demoNodeIds: ['kb-stance', 'kb-jab', 'kb-cross', 'kb-hook', 'kb-jch'],
  },
];

export const GOAL_BY_SLUG = new Map(FEATURED_GOALS.map((g) => [g.slug, g]));

// Goals grouped by library ID
export const GOALS_BY_LIBRARY = new Map<string, LandingGoal[]>();
for (const goal of FEATURED_GOALS) {
  const list = GOALS_BY_LIBRARY.get(goal.libraryId) ?? [];
  list.push(goal);
  GOALS_BY_LIBRARY.set(goal.libraryId, list);
}
