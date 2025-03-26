
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';
import { TaskCategory } from '../types/task';
import { motion } from 'framer-motion';

interface NewTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (title: string, category: TaskCategory) => void;
}

const categoryIcons = {
  personal: '👤',
  work: '💼',
  shopping: '🛍️',
  health: '❤️',
};

export function NewTaskDialog({ open, onOpenChange, onSubmit }: NewTaskDialogProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title, category);
    setTitle('');
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" 
        />
        <Dialog.Content className="fixed left-[50%] top-[50%] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white/80 backdrop-blur-xl p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] dark:bg-gray-800/80">
          <Dialog.Title className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-400">
            New Task
          </Dialog.Title>
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                What needs to be done?
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300/50 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600/50 dark:bg-gray-900/50 dark:text-white"
                placeholder="Enter your task here..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Category
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(Object.keys(categoryIcons) as TaskCategory[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`relative rounded-lg border p-3 text-center transition-all hover:border-blue-500 ${
                      category === cat
                        ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'border-gray-200 bg-white/50 dark:border-gray-700 dark:bg-gray-800/50'
                    }`}
                  >
                    <span className="text-xl">{categoryIcons[cat]}</span>
                    <span className="mt-1 block text-sm capitalize">
                      {cat}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:shadow-blue-400/20 dark:hover:shadow-blue-400/30"
              >
                Create Task
              </button>
            </div>
          </form>

          <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 opacity-70 transition-opacity hover:bg-gray-100 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none dark:hover:bg-gray-800">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}