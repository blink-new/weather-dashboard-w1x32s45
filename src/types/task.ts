
export type TaskCategory = 'personal' | 'work' | 'shopping' | 'health';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: TaskCategory;
  createdAt: number;
}