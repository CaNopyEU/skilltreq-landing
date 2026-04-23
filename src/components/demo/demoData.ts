import type { DemoLibrary } from './types';

export const DEMO_LIBRARIES: DemoLibrary[] = [
  // ── Calisthenics (rings-based, push/pull split with shared root) ──
  {
    id: 'calisthenics',
    name: 'Calisthenics',
    image: '/images/goals/muscle-up.webp',
    defaultGoalSlug: 'muscle-up',
    categories: [
      { id: 'push', name: 'Push', color: '#ef4444' },
      { id: 'pull', name: 'Pull', color: '#3b82f6' },
    ],
    skills: [
      {
        id: 'ring-support',
        name: 'Ring Support Hold',
        abbr: 'Support',
        categoryId: 'push',
        requires: [],
        progressions: 2,
        description: 'Static hold on rings with arms locked out. Foundation for all ring work.',
      },
      {
        id: 'ring-dip',
        name: 'Ring Dip',
        categoryId: 'push',
        requires: ['ring-support'],
        progressions: 3,
        description:
          'Dip on gymnastic rings — significantly harder than parallel bars due to instability.',
      },
      {
        id: 'ring-push-up',
        name: 'Ring Push-up',
        abbr: 'Ring PU',
        categoryId: 'push',
        requires: ['ring-support'],
        progressions: 3,
        description:
          'Push-up with hands on rings. Increased instability demands greater shoulder stabilization.',
      },
      {
        id: 'ring-pppu',
        name: 'Ring PPPU',
        abbr: 'PPPU',
        categoryId: 'push',
        requires: ['ring-push-up'],
        progressions: 3,
        description:
          'Pseudo planche push-up on rings. Leaning forward shifts load toward planche position.',
      },
      {
        id: 'tuck-planche',
        name: 'Tuck Planche',
        categoryId: 'push',
        requires: ['ring-pppu'],
        progressions: 3,
        description:
          'Hold body horizontal on rings with knees tucked to chest. First true planche progression.',
      },
      {
        id: 'ring-row',
        name: 'Ring Row',
        categoryId: 'pull',
        requires: [],
        progressions: 2,
        description:
          'Inverted row on rings — pulling body up from an angled hang. Builds foundational pull strength.',
      },
      {
        id: 'ring-pull-up',
        name: 'Ring Pull-up',
        abbr: 'Pull-up',
        categoryId: 'pull',
        requires: ['ring-row'],
        progressions: 3,
        description:
          'Full pull-up on rings with free rotation. Harder than bar due to stabilization demands.',
      },
      {
        id: 'ring-mu',
        name: 'Ring Muscle-up',
        abbr: 'Muscle-up',
        categoryId: 'pull',
        requires: ['ring-dip', 'ring-pull-up'],
        progressions: 3,
        description:
          'Pull-up transitioning over the rings into a dip. The ultimate upper-body ring skill.',
      },
    ],
    progress: {
      'ring-support': { status: 'mastered', currentStep: 2 },
      'ring-dip': { status: 'completed', currentStep: 3 },
      'ring-push-up': { status: 'completed', currentStep: 3 },
      'ring-pppu': { status: 'in_progress', currentStep: 1 },
      'tuck-planche': { status: 'locked', currentStep: 0 },
      'ring-row': { status: 'mastered', currentStep: 2 },
      'ring-pull-up': { status: 'completed', currentStep: 3 },
      'ring-mu': { status: 'in_progress', currentStep: 1 },
    },
  },

  // ── Mobility (real app data: hip + spine, 2 convergence points) ──
  {
    id: 'mobility',
    name: 'Mobility',
    image: '/images/goals/front-split.webp',
    defaultGoalSlug: 'front-split',
    categories: [
      { id: 'mob-hip', name: 'Hip', color: '#14b8a6' },
      { id: 'mob-spine', name: 'Spine', color: '#8b5cf6' },
    ],
    skills: [
      {
        id: '90-90-stretch',
        name: '90/90 Stretch',
        abbr: '90/90',
        categoryId: 'mob-hip',
        requires: [],
        progressions: 2,
        description:
          'Both legs at 90° angles targeting hip internal and external rotation simultaneously.',
      },
      {
        id: 'pigeon-pose',
        name: 'Pigeon Pose',
        abbr: 'Pigeon',
        categoryId: 'mob-hip',
        requires: ['90-90-stretch'],
        progressions: 2,
        description:
          'Deep hip opener with front leg externally rotated and back leg extended. Key for front split.',
      },
      {
        id: 'hip-pails-rails',
        name: 'Hip PAILs/RAILs',
        abbr: 'Hip P/R',
        categoryId: 'mob-hip',
        requires: ['90-90-stretch'],
        progressions: 2,
        description:
          'Progressive and regressive isometric loading for hip end-range. Builds active flexibility.',
      },
      {
        id: 'front-split',
        name: 'Front Split',
        categoryId: 'mob-hip',
        requires: ['pigeon-pose', 'hip-pails-rails'],
        progressions: 3,
        description:
          'Full front split with hips square. Requires both passive range and active control.',
      },
      {
        id: 'cat-cow',
        name: 'Cat-Cow',
        categoryId: 'mob-spine',
        requires: [],
        progressions: 2,
        description:
          'Alternating spinal flexion and extension on all fours. Warms up the entire spine segmentally.',
      },
      {
        id: 'jefferson-curl',
        name: 'Jefferson Curl',
        abbr: 'Jeff Curl',
        categoryId: 'mob-spine',
        requires: ['cat-cow'],
        progressions: 2,
        description:
          'Standing segmental spinal flexion with light load. Targets hamstrings and posterior chain.',
      },
      {
        id: 'shoulder-cars',
        name: 'Shoulder CARs',
        abbr: 'Shldr CARs',
        categoryId: 'mob-spine',
        requires: [],
        progressions: 2,
        description:
          'Controlled Articular Rotations for the shoulder. Slow circles through full available range.',
      },
      {
        id: 'full-bridge',
        name: 'Full Bridge',
        abbr: 'Bridge',
        categoryId: 'mob-spine',
        requires: ['jefferson-curl', 'shoulder-cars'],
        progressions: 3,
        description:
          'Full bridge with arms and legs extended, hips pushed high. Requires shoulder and spine mobility.',
      },
    ],
    progress: {
      '90-90-stretch': { status: 'mastered', currentStep: 2 },
      'pigeon-pose': { status: 'completed', currentStep: 2 },
      'hip-pails-rails': { status: 'completed', currentStep: 2 },
      'front-split': { status: 'in_progress', currentStep: 1 },
      'cat-cow': { status: 'mastered', currentStep: 2 },
      'jefferson-curl': { status: 'completed', currentStep: 2 },
      'shoulder-cars': { status: 'completed', currentStep: 2 },
      'full-bridge': { status: 'in_progress', currentStep: 1 },
    },
  },

  // ── Acrobatics (cartwheel branches to aerial + backflip paths) ──
  {
    id: 'acrobatics',
    name: 'Acrobatics',
    image: '/images/goals/aerial-cartwheel.webp',
    defaultGoalSlug: 'aerial-cartwheel',
    categories: [
      { id: 'tmb-cartwheels', name: 'Cartwheels', color: '#ec4899' },
      { id: 'tmb-flips', name: 'Flips', color: '#a855f7' },
    ],
    skills: [
      {
        id: 'tmb-cartwheel',
        name: 'Cartwheel',
        categoryId: 'tmb-cartwheels',
        requires: [],
        progressions: 2,
        description: 'Lateral rotation through hand-hand-foot-foot pattern with straight legs.',
      },
      {
        id: 'tmb-one-hand-cw',
        name: 'One-Hand Cartwheel',
        abbr: '1H Cartwheel',
        categoryId: 'tmb-cartwheels',
        requires: ['tmb-cartwheel'],
        progressions: 2,
        description:
          'Cartwheel with only one hand touching the ground. Builds aerial awareness.',
      },
      {
        id: 'tmb-aerial',
        name: 'Aerial Cartwheel',
        abbr: 'Aerial',
        categoryId: 'tmb-cartwheels',
        requires: ['tmb-one-hand-cw'],
        progressions: 3,
        description: 'No-hands cartwheel — a true aerial rotation. The iconic tumbling milestone.',
      },
      {
        id: 'tmb-round-off',
        name: 'Round-off',
        categoryId: 'tmb-flips',
        requires: ['tmb-cartwheel'],
        progressions: 2,
        description:
          'Cartwheel variant that lands with both feet together facing the start. Entry for flips.',
      },
      {
        id: 'tmb-bridge',
        name: 'Bridge Hold',
        abbr: 'Bridge',
        categoryId: 'tmb-flips',
        requires: [],
        progressions: 2,
        description:
          'Full bridge position — hands and feet on ground, hips pushed high. Opens shoulders and spine.',
      },
      {
        id: 'tmb-bhs',
        name: 'Back Handspring',
        abbr: 'BHS',
        categoryId: 'tmb-flips',
        requires: ['tmb-round-off', 'tmb-bridge'],
        progressions: 3,
        description:
          'Jump backwards onto hands, then snap feet over into standing. Gateway to backflips.',
      },
      {
        id: 'tmb-back-tuck',
        name: 'Back Tuck',
        abbr: 'Backflip',
        categoryId: 'tmb-flips',
        requires: ['tmb-bhs'],
        progressions: 3,
        description:
          'Standing backward somersault in tucked position. The quintessential tumbling skill.',
      },
    ],
    progress: {
      'tmb-cartwheel': { status: 'mastered', currentStep: 2 },
      'tmb-one-hand-cw': { status: 'completed', currentStep: 2 },
      'tmb-aerial': { status: 'in_progress', currentStep: 1 },
      'tmb-round-off': { status: 'completed', currentStep: 2 },
      'tmb-bridge': { status: 'mastered', currentStep: 2 },
      'tmb-bhs': { status: 'in_progress', currentStep: 1 },
      'tmb-back-tuck': { status: 'locked', currentStep: 0 },
    },
  },

  // ── Kickboxing (stance branches to punches + kicks, convergence at combo) ──
  {
    id: 'kickboxing',
    name: 'Kickboxing',
    image: '/images/goals/roundhouse-kick.webp',
    defaultGoalSlug: 'roundhouse-kick',
    categories: [
      { id: 'kb-footwork', name: 'Footwork', color: '#ef4444' },
      { id: 'kb-punches', name: 'Punches', color: '#fca5a5' },
      { id: 'kb-kicks', name: 'Kicks', color: '#f87171' },
      { id: 'kb-combos', name: 'Combos', color: '#b91c1c' },
    ],
    skills: [
      {
        id: 'kb-stance',
        name: 'Fighting Stance',
        abbr: 'Stance',
        categoryId: 'kb-footwork',
        requires: [],
        progressions: 2,
        description:
          'Balanced guard position with lead foot forward, hands protecting chin and body.',
      },
      {
        id: 'kb-jab',
        name: 'Jab',
        categoryId: 'kb-punches',
        requires: ['kb-stance'],
        progressions: 2,
        description:
          'Quick straight punch with the lead hand. Sets up combinations and controls distance.',
      },
      {
        id: 'kb-cross',
        name: 'Cross',
        categoryId: 'kb-punches',
        requires: ['kb-jab'],
        progressions: 2,
        description:
          'Power straight punch from the rear hand with full hip rotation. The knockout punch.',
      },
      {
        id: 'kb-hook',
        name: 'Hook',
        categoryId: 'kb-punches',
        requires: ['kb-jab'],
        progressions: 2,
        description:
          'Circular punch targeting the side of the head or body. Devastating at close range.',
      },
      {
        id: 'kb-jch',
        name: 'Jab-Cross-Hook',
        abbr: 'J-C-H',
        categoryId: 'kb-combos',
        requires: ['kb-cross', 'kb-hook'],
        progressions: 2,
        description:
          'The classic three-punch combination. Foundation of all striking combinations.',
      },
      {
        id: 'kb-front-kick',
        name: 'Front Kick',
        categoryId: 'kb-kicks',
        requires: ['kb-stance'],
        progressions: 2,
        description:
          'Pushing kick with the ball of the foot to the midsection. Creates distance and disrupts rhythm.',
      },
      {
        id: 'kb-roundhouse',
        name: 'Roundhouse Kick',
        abbr: 'Roundhouse',
        categoryId: 'kb-kicks',
        requires: ['kb-front-kick'],
        progressions: 2,
        description:
          'Powerful rotational kick striking with the shin. The most used kick in kickboxing.',
      },
    ],
    progress: {
      'kb-stance': { status: 'mastered', currentStep: 2 },
      'kb-jab': { status: 'completed', currentStep: 2 },
      'kb-cross': { status: 'completed', currentStep: 2 },
      'kb-hook': { status: 'completed', currentStep: 2 },
      'kb-jch': { status: 'in_progress', currentStep: 1 },
      'kb-front-kick': { status: 'completed', currentStep: 2 },
      'kb-roundhouse': { status: 'in_progress', currentStep: 1 },
    },
  },
];

export const LIBRARY_IDS = DEMO_LIBRARIES.map((l) => l.id);
