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
    path: ['Push-up', 'Dip', 'Pull-up', 'Muscle-up'],
    demoNodeIds: ['push-up', 'dip', 'pull-up', 'bar-mu'],
  },
  {
    slug: 'l-sit',
    image: '/images/goals/l-sit.webp',
    libraryId: 'calisthenics',
    path: ['Push-up', 'Dip', 'Pull-up', 'L-sit'],
    demoNodeIds: ['push-up', 'dip', 'pull-up', 'l-sit'],
  },

  // ── Mobility ──
  {
    slug: 'front-split',
    image: '/images/goals/front-split.webp',
    libraryId: 'mobility',
    path: ['Deep Squat Hold', 'Hip CARs', '90/90 Stretch'],
    demoNodeIds: ['deep-squat-hold', 'hip-cars', '90-90-stretch'],
  },
  {
    slug: 'jefferson-curl',
    image: '/images/goals/jefferson-curl.webp',
    libraryId: 'mobility',
    path: ['Cat-Cow', 'Thoracic Rotation', 'Jefferson Curl'],
    demoNodeIds: ['cat-cow', 'thoracic-rotation', 'jefferson-curl'],
  },

  // ── Acrobatics ──
  {
    slug: 'aerial-cartwheel',
    image: '/images/goals/aerial-cartwheel.webp',
    libraryId: 'acrobatics',
    path: ['Forward Roll', 'Cartwheel', 'Aerial'],
    demoNodeIds: ['tmb-forward-roll', 'tmb-cartwheel', 'tmb-aerial'],
  },
  {
    slug: 'bridge',
    image: '/images/goals/bridge.webp',
    libraryId: 'acrobatics',
    path: ['Forward Roll', 'Headstand', 'Bridge'],
    demoNodeIds: ['tmb-forward-roll', 'tmb-headstand', 'tmb-bridge'],
  },

  // ── Juggling ──
  {
    slug: 'mills-mess',
    image: '/images/goals/mills-mess.webp',
    libraryId: 'juggling',
    path: ['3-Ball Cascade', 'Reverse Cascade', 'Mills Mess'],
    demoNodeIds: ['jgb-three-ball-cascade', 'jgb-reverse-cascade', 'jgb-mills-mess'],
  },
  {
    slug: 'behind-the-back',
    image: '/images/goals/behind-the-back.webp',
    libraryId: 'juggling',
    path: ['3-Ball Cascade', 'Under the Leg', 'Behind the Back'],
    demoNodeIds: ['jgb-three-ball-cascade', 'jgb-under-the-leg', 'jgb-behind-the-back'],
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
