import type { TimerStatus } from '../types';

interface Props {
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function TimerControls({ status, onStart, onPause, onReset }: Props) {
  return (
    <div className="flex items-center gap-4">
      {status === 'running' ? (
        <button
          onClick={onPause}
          className="px-8 py-3 rounded-2xl bg-gray-800 dark:bg-gray-100
            text-white dark:text-gray-800 text-sm font-medium
            hover:bg-gray-700 dark:hover:bg-gray-200
            transition-all duration-200 active:scale-95"
        >
          暂停
        </button>
      ) : (
        <button
          onClick={onStart}
          className="px-8 py-3 rounded-2xl bg-red-400 hover:bg-red-500
            text-white text-sm font-medium
            transition-all duration-200 active:scale-95 shadow-lg shadow-red-400/25"
        >
          开始
        </button>
      )}

      <button
        onClick={onReset}
        className="px-5 py-3 rounded-2xl text-sm font-medium
          text-gray-400 dark:text-gray-500
          hover:text-gray-600 dark:hover:text-gray-300
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition-all duration-200 active:scale-95"
      >
        重置
      </button>
    </div>
  );
}
