
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { TaskCard } from './components/TaskCard';
import { NewTaskDialog } from './components/NewTaskDialog';
import { useTaskStore } from './stores/taskStore';
import { TaskCategory } from './types/task';

const categories: (TaskCategory | 'all')[] = ['all', 'personal', 'work', 'shopping', 'health'];

const categoryGradients = {
  all: 'from-gray-900 to-gray-600',
  personal: 'from-blue-500 to-blue-600',
  work: 'from-purple-500 to-purple-600',
  shopping: 'from-green-500 to-green-600',
  health: 'from-red-500 to-red-600',
};

export default function App() {
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const { tasks, addTask, toggleTask, deleteTask, filterCategory, setFilterCategory } = useTaskStore();

  const filteredTasks = filterCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === filterCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold text-transparent dark:from-gray-100 dark:to-gray-400">
            Tasks
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsNewTaskOpen(true)}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-shadow hover:shadow-xl hover:shadow-blue-500/30 dark:shadow-blue-400/20 dark:hover:shadow-blue-400/30"
          >
            <Plus size={18} />
            New Task
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterCategory(category)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium shadow-lg transition-all ${
                filterCategory === category
                  ? `bg-gradient-to-r ${categoryGradients[category]} text-white shadow-${category}-500/20`
                  : 'bg-white text-gray-600 shadow-gray-200/50 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:shadow-gray-900/50 dark:hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        <motion.div layout className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
            
            {filteredTasks.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white/50 p-12 text-center backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50"
              >
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  No tasks found
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Create a new task to get started!
                </p>
                <button
                  onClick={() => setIsNewTaskOpen(true)}
                  className="mt-4 text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Add your first task →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <NewTaskDialog
        open={isNewTaskOpen}
        onOpenChange={setIsNewTaskOpen}
        onSubmit={addTask}
      />
    </div>
  );
}