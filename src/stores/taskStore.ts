
import { create } from 'zustand';
import { Task, TaskCategory } from '../types/task';

interface TaskStore {
  tasks: Task[];
  filterCategory: TaskCategory | 'all';
  addTask: (title: string, category: TaskCategory) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setFilterCategory: (category: TaskCategory | 'all') => void;
}

// Sample tasks with realistic dates and varied categories
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete quarterly report presentation',
    completed: false,
    category: 'work',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    id: '2',
    title: 'Schedule annual health checkup',
    completed: false,
    category: 'health',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: '3',
    title: 'Buy groceries for the week',
    completed: true,
    category: 'shopping',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: '4',
    title: 'Call mom for her birthday',
    completed: false,
    category: 'personal',
    createdAt: new Date().toISOString(), // today
  },
  {
    id: '5',
    title: 'Review project timeline with team',
    completed: false,
    category: 'work',
    createdAt: new Date().toISOString(), // today
  },
  {
    id: '6',
    title: 'Order new running shoes',
    completed: false,
    category: 'shopping',
    createdAt: new Date().toISOString(), // today
  },
  {
    id: '7',
    title: 'Schedule dentist appointment',
    completed: false,
    category: 'health',
    createdAt: new Date().toISOString(), // today
  },
  {
    id: '8',
    title: 'Plan weekend hiking trip',
    completed: false,
    category: 'personal',
    createdAt: new Date().toISOString(), // today
  }
];

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: initialTasks,
  filterCategory: 'all',
  addTask: (title, category) =>
    set((state) => ({
      tasks: [
        {
          id: Math.random().toString(36).substring(2),
          title,
          category,
          completed: false,
          createdAt: new Date().toISOString(),
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
  setFilterCategory: (category) =>
    set(() => ({
      filterCategory: category,
    })),
}));