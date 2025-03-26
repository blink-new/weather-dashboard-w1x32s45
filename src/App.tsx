
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { TaskCard } from './components/TaskCard';
import { NewTaskDialog } from './components/NewTaskDialog';
import { useTaskStore } from './stores/taskStore';
import { TaskCategory } from './types/task';

const categories: (TaskCategory | 'all')[] = ['all', 'personal', 'work', 'shopping', 'health'];

export default function App() {
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const { tasks, addTask, toggleTask, deleteTask, filterCategory, setFilterCategory } = useTaskStore();

  const filteredTasks = filterCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === filterCategory);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
          <button
            onClick={() => setIsNewTaskOpen(true)}
            className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            <Plus size={16} />
            New Task
          </button>
        </div>

        <div className="mb-6 flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filterCategory === category
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <motion.div layout className="space-y-4">
          <AnimatePresence>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </AnimatePresence>
          
          {filteredTasks.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 dark:text-gray-400"
            >
              No tasks found. Create a new task to get started!
            </motion.p>
          )}
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