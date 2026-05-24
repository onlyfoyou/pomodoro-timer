import type { TimerPhase } from '../types';

interface Props {
  phase: TimerPhase;
  status: string;
}

export default function PhaseIndicator({ phase, status }: Props) {
  const isFocus = phase === 'focus';

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full
          transition-all duration-500
          ${isFocus
            ? 'bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-300'
            : 'bg-green-50 text-green-500 dark:bg-green-900/30 dark:text-green-300'
          }`}
      >
        {status === 'running' ? (isFocus ? '专注中' : '休息中') : (isFocus ? '准备专注' : '准备休息')}
      </div>
      <div className="flex gap-1">
        <div
          className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isFocus ? 'bg-red-400' : 'bg-gray-300 dark:bg-gray-600'}`}
        />
        <div
          className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${!isFocus ? 'bg-green-400' : 'bg-gray-300 dark:bg-gray-600'}`}
        />
      </div>
    </div>
  );
}
