export type NodeStatus = 'locked' | 'unlocked' | 'in_progress' | 'completed' | 'mastered';

export interface DemoMove {
  id: string;
  name: string;
  abbr?: string;
  categoryId: string;
  requires: string[];
  progressions: number; // total steps count
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
