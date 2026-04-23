export type NodeStatus = 'locked' | 'unlocked' | 'in_progress' | 'completed' | 'mastered';

export interface DemoMove {
  id: string;
  name: string;
  abbr?: string;
  categoryId: string;
  requires: string[];
  progressions: number; // total steps count
  description?: string; // short skill description for tooltip
  progressionPreview?: string; // name of first progression step
}

export interface DemoProgress {
  status: Exclude<NodeStatus, 'unlocked'>; // stored status (unlocked is computed)
  currentStep: number;
}

export interface DemoCategory {
  id: string;
  name: string;
  color: string;
}

export interface DemoLibrary {
  id: string;
  name: string;
  image: string;
  categories: DemoCategory[];
  skills: DemoMove[];
  progress: Record<string, DemoProgress>;
  defaultGoalSlug: string;
}
