export interface LandingGoal {
  slug: string
  image: string
  libraryId: string
  path: string[]
  /** Node IDs that exist in the calisthenics demo tree — for path highlighting */
  demoNodeIds: string[]
}

export const FEATURED_GOALS: LandingGoal[] = [
  {
    slug: 'muscle-up',
    image: '/images/goals/muscle-up.webp',
    libraryId: 'calisthenics-beginner',
    path: ['Dead Hang', 'Active Hang', 'Pull-up', 'Chest-to-Bar', 'Muscle-up'],
    demoNodeIds: ['dead-hang', 'active-hang', 'pull-up', 'chest-to-bar', 'muscle-up'],
  },
  {
    slug: 'handstand',
    image: '/images/goals/handstand.webp',
    libraryId: 'calisthenics-beginner',
    path: ['Push-up', 'Diamond PU', 'Pike PU', 'HSPU'],
    demoNodeIds: ['push-up', 'diamond-pu', 'pike-pu', 'hspu'],
  },
  {
    slug: 'planche',
    image: '/images/goals/planche.webp',
    libraryId: 'calisthenics-beginner',
    path: ['Push-up', 'Pseudo Planche PU', 'Planche Lean', 'Tuck Planche', 'Planche'],
    demoNodeIds: ['push-up', 'pseudo-planche-pu', 'planche-lean'],
  },
  {
    slug: 'front-lever',
    image: '/images/goals/front-lever.webp',
    libraryId: 'calisthenics-beginner',
    path: ['Dead Hang', 'Active Hang', 'Tuck Front Lever', 'Adv. Tuck FL', 'Front Lever'],
    demoNodeIds: ['dead-hang', 'active-hang', 'pull-up'],
  },
  {
    slug: 'human-flag',
    image: '/images/goals/human-flag.webp',
    libraryId: 'calisthenics-beginner',
    path: ['Plank', 'Side Plank', 'Tuck Flag', 'Human Flag'],
    demoNodeIds: ['plank', 'side-plank', 'human-flag'],
  },
  {
    slug: 'front-split',
    image: '/images/goals/front-split.webp',
    libraryId: 'mobility-beginner',
    path: ['Hip Flexor Stretch', 'Low Lunge', 'Half Split', 'Front Split'],
    demoNodeIds: [],
  },
  {
    slug: 'aerial-cartwheel',
    image: '/images/goals/aerial-cartwheel.webp',
    libraryId: 'tumbling-beginner',
    path: ['Cartwheel', 'One-hand Cartwheel', 'Dive Cartwheel', 'Aerial'],
    demoNodeIds: [],
  },
  {
    slug: 'juggling',
    image: '/images/goals/three-ball-cascade.webp',
    libraryId: 'juggling-balls-beginner',
    path: ['One Ball Throws', 'Two Ball Exchange', 'Three Ball Cascade'],
    demoNodeIds: [],
  },
]

export const GOAL_BY_SLUG = new Map(FEATURED_GOALS.map((g) => [g.slug, g]))
