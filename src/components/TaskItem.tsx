
import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { useTaskStore } from '../stores/taskStore';
import { Task } from '../types/task';
import { TimeTracker } from './TimeTracker';
import { formatDistanceToNow } from 'date-fns';

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group flex flex-col gap-3 rounded-lg border p-4 shadow-sm transition-all hover:shadow-md ${
        task.completed ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => toggleTask(task.id)}
          className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
            task.completed
              ? 'border-green-500 bg-green-500 text-white'
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {task.completed && <Check className="h-3 w-3" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-medium ${
              task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[task.category]}`}>
              {task.category}
            </span>
          </div>
          
          <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
            <span>Created {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</span>
          </div>
        </div>

        <button
          onClick={() => deleteTask(task.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <TimeTracker
        isTracking={task.isTracking}
        totalTime={task.totalTime}
        onStartTracking={() => startTimeTracking(task.id)}
        onStopTracking={() => stopTimeTracking(task.id)}
      />
    </motion.div>
  );
};