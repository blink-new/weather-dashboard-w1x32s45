
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskCategory } from '../types/task';

interface TaskStore {
  tasks: Task[];
  filterCategory: TaskCategory | 'all';
  addTask: (title: string, category: TaskCategory) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setFilterCategory: (category: TaskCategory | 'all') => void;
  startTimeTracking: (id: string) => void;
  stopTimeTracking: (id: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      filterCategory: 'all',

      addTask: (title, category) => {
        const newTask: Task = {
          id: crypto.randomUUID(),
          title,
          category,
          completed: false,
          createdAt: new Date().toISOString(),
          timeEntries: [],
          isTracking: false,
          totalTime: 0,
        };
        set((state) => ({ tasks: [newTask, ...state.tasks] }));
      },

      toggleTask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      setFilterCategory: (category) => {
        set({ filterCategory: category });
      },

      startTimeTracking: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === id) {
              return {
                ...task,
                isTracking: true,
                timeEntries: [
                  ...task.timeEntries,
                  { id: crypto.randomUUID(), startTime: new Date().toISOString() }
                ],
              };
            }
            // Stop tracking for all other tasks
            return task.isTracking ? { ...task, isTracking: false } : task;
          }),
        }));
      },

      stopTimeTracking: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === id && task.isTracking) {
              const timeEntries = [...task.timeEntries];
              const currentEntry = timeEntries[timeEntries.length - 1];
              
              if (currentEntry && !currentEntry.endTime) {
                const endTime = new Date();
                const startTime = new Date(currentEntry.startTime);
                const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
                
                timeEntries[timeEntries.length - 1] = {
                  ...currentEntry,
                  endTime: endTime.toISOString(),
                  duration,
                };
                
                return {
                  ...task,
                  isTracking: false,
                  timeEntries,
                  totalTime: task.totalTime + duration,
                };
              }
              return { ...task, isTracking: false };
            }
            return task;
          }),
        }));
      },
    }),
    {
      name: 'task-store',
    }
  )
);