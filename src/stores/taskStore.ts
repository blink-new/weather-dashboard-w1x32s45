
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskCategory } from '../types/task';

interface TaskState {
  tasks: Task[];
  addTask: (title: string, category: TaskCategory) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  filterCategory: TaskCategory | 'all';
  setFilterCategory: (category: TaskCategory | 'all') => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      filterCategory: 'all',
      addTask: (title, category) =>
        set((state) => ({
          tasks: [
            {
              id: Math.random().toString(36).substring(2),
              title,
              completed: false,
              category,
              createdAt: Date.now(),
            },
            ...state.tasks,
          ],
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      setFilterCategory: (category) => set({ filterCategory: category }),
    }),
    {
      name: 'task-storage',
    }
  )
);