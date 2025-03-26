
import { useEffect, useState } from 'react';
import { Play, Pause, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDuration } from '../utils/time';

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
    let interval: number;
    
    if (isTracking) {
      interval = window.setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsed(totalTime);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTracking, totalTime]);

  return (
    <div className="flex items-center gap-2">
      <Clock size={14} className="text-gray-500" />
      <span className="text-sm text-gray-600 font-medium w-20">
        {formatDuration(elapsed)}
      </span>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={isTracking ? onStopTracking : onStartTracking}
        className={`p-1.5 rounded-full ${
          isTracking
            ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : 'bg-green-100 text-green-600 hover:bg-green-200'
        }`}
      >
        {isTracking ? <Pause size={14} /> : <Play size={14} />}
      </motion.button>
    </div>
  );
};