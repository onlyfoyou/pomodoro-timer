import { motion } from 'framer-motion';

interface Props {
  minutes: number;
  seconds: number;
  progress: number;
  isFocus: boolean;
  isRunning: boolean;
}

export default function Timer({ minutes, seconds, progress, isFocus, isRunning }: Props) {
  const circumference = 2 * Math.PI * 140;
  const offset = circumference * (1 - progress);

  const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="relative flex items-center justify-center">
      {/* Background ring */}
      <svg
        className="w-[320px] h-[320px] -rotate-90"
        viewBox="0 0 320 320"
      >
        <circle
          cx="160"
          cy="160"
          r="140"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-gray-100 dark:text-gray-800 transition-colors duration-500"
        />
        {/* Progress ring */}
        <motion.circle
          cx="160"
          cy="160"
          r="140"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className={`transition-colors duration-500 ${
            isFocus ? 'text-red-400' : 'text-green-400'
          }`}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={false}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </svg>

      {/* Time display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={`${minutes}-${seconds}`}
          initial={{ opacity: 0.6, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className={`font-mono text-[5.5rem] font-light tracking-tight tabular-nums
            ${isFocus ? 'text-gray-800 dark:text-gray-100' : 'text-green-600 dark:text-green-300'}`}
        >
          {timeStr}
        </motion.span>
      </div>
    </div>
  );
}
