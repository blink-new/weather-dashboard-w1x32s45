
export type TaskCategory = 'work' | 'personal' | 'shopping' | 'health';

export interface TimeEntry {
  id: string;
  startTime: string;
  endTime?: string;
  duration?: number; // in seconds
}

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  completed: boolean;
  createdAt: string;
  timeEntries: TimeEntry[];
  isTracking: boolean;
  totalTime: number; // in seconds
}