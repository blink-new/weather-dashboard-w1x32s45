
import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const categoryColors = {
  personal: 'from-blue-400 to-blue-500',
  work: 'from-purple-400 to-purple-500',
  shopping: 'from-green-400 to-green-500',
  health: 'from-red-400 to-red-500',
};

const categoryIcons = {
  personal: '👤',
  work: '💼',
  shopping: '🛍️',
  health: '❤️',
};

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl border bg-white/50 p-4 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl dark:bg-gray-800/50 dark:border-gray-700"
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-5 dark:opacity-10" />
      
      <div className="relative flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(task.id)}
          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
            task.completed
              ? 'border-green-500 bg-green-500 dark:border-green-400 dark:bg-green-400'
              : 'border-gray-300 hover:border-green-500 dark:border-gray-600 dark:hover:border-green-400'
          }`}
        >
          {task.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Check size={14} className="text-white" />
            </motion.div>
          )}
        </motion.button>
        
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <p className={`font-medium transition-all ${
              task.completed 
                ? 'text-gray-400 line-through' 
                : 'text-gray-900 dark:text-gray-100'
            }`}>
              {task.title}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${
              categoryColors[task.category]
            } px-2 py-0.5 text-xs font-medium text-white shadow-sm`}>
              {categoryIcons[task.category]} {task.category}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
        >
          <Trash2 size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
}