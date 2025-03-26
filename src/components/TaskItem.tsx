
import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { useTaskStore } from '../stores/taskStore';
import { Task } from '../types/task';
import { taskItemAnimation } from '../styles/animations';
import { formatDistanceToNow } from 'date-fns';
import { TimeTracker } from './TimeTracker';

const categoryColors = {
  work: 'bg-blue-100 text-blue-800',
  personal: 'bg-purple-100 text-purple-800',
  shopping: 'bg-green-100 text-green-800',
  health: 'bg-red-100 text-red-800'
};

interface TaskItemProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const { toggleTask, deleteTask, startTimeTracking, stopTimeTracking } = useTaskStore();

  return (
    <motion.div
      layout
      variants={taskItemAnimation}
      initial="hidden"
      animate="show"
      exit="hidden"
      className={`group relative flex items-center gap-4 rounded-lg border p-4 shadow-sm transition-all duration-200 hover:shadow-md ${
        task.completed ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <button
        onClick={() => toggleTask(task.id)}
        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
          task.completed
            ? 'border-green-500 bg-green-500 text-white'
            : 'border-gray-300 hover:border-green-500'
        }`}
      >
        {task.completed && <Check size={14} />}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
            {task.title}
          </p>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[task.category]}`}>
            {task.category}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <TimeTracker
            isTracking={task.isTracking}
            totalTime={task.totalTime}
            onStartTracking={() => startTimeTracking(task.id)}
            onStopTracking={() => stopTimeTracking(task.id)}
          />
          <span className="text-sm text-gray-500">
            Created {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:text-red-500"
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
};