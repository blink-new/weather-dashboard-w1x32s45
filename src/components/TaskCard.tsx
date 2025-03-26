
import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const categoryColors = {
  personal: 'bg-blue-500',
  work: 'bg-purple-500',
  shopping: 'bg-green-500',
  health: 'bg-red-500',
};

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <button
        onClick={() => onToggle(task.id)}
        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${
          task.completed
            ? 'border-green-500 bg-green-500'
            : 'border-gray-300 hover:border-green-500'
        }`}
      >
        {task.completed && <Check size={14} className="text-white" />}
      </button>
      
      <div className="flex-1">
        <p className={`font-medium ${task.completed ? 'text-gray-400 line-through' : ''}`}>
          {task.title}
        </p>
        <span className={`inline-block rounded-full px-2 py-0.5 text-xs text-white ${categoryColors[task.category]}`}>
          {task.category}
        </span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
}