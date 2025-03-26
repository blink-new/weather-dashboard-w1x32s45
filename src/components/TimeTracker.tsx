
import { useEffect, useState } from 'react';
import { Play, Pause, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimeTrackerProps {
  isTracking: boolean;
  totalTime: number;
  onStartTracking: () => void;
  onStopTracking: () => void;
}

export const TimeTracker = ({
  isTracking,
  totalTime,
  onStartTracking,
  onStopTracking,
}: TimeTrackerProps) => {
  const [elapsed, setElapsed] = useState(totalTime);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isTracking) {
      interval = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
    } else {
      setElapsed(totalTime);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTracking, totalTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  return (
    <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full">
      <Clock className="h-4 w-4 text-gray-500" />
      <span className="text-sm font-medium text-gray-700 min-w-[60px]">
        {formatTime(elapsed)}
      </span>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={isTracking ? onStopTracking : onStartTracking}
        className={`p-1.5 rounded-full transition-colors ${
          isTracking 
            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
            : 'bg-green-100 text-green-600 hover:bg-green-200'
        }`}
      >
        {isTracking ? (
          <Pause className="h-3.5 w-3.5" />
        ) : (
          <Play className="h-3.5 w-3.5" />
        )}
      </motion.button>
    </div>
  );
};