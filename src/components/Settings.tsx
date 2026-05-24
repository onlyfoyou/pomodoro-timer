import { useTimerStore } from '../store/useTimerStore';

export default function Settings() {
  const focusDuration = useTimerStore((s) => s.focusDuration);
  const breakDuration = useTimerStore((s) => s.breakDuration);
  const autoStartNext = useTimerStore((s) => s.autoStartNext);
  const setFocusDuration = useTimerStore((s) => s.setFocusDuration);
  const setBreakDuration = useTimerStore((s) => s.setBreakDuration);
  const setAutoStartNext = useTimerStore((s) => s.setAutoStartNext);

  return (
    <div className="w-full max-w-sm space-y-5">
      <h3 className="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
        时间设置
      </h3>

      {/* Focus duration */}
      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-600 dark:text-gray-300">专注时长</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => focusDuration > 5 && setFocusDuration(focusDuration - 5)}
            className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800
              text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700
              transition-colors text-sm flex items-center justify-center"
          >
            −
          </button>
          <span className="w-12 text-center text-sm font-medium text-gray-700 dark:text-gray-200 tabular-nums">
            {focusDuration} 分钟
          </span>
          <button
            onClick={() => focusDuration < 120 && setFocusDuration(focusDuration + 5)}
            className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800
              text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700
              transition-colors text-sm flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Break duration */}
      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-600 dark:text-gray-300">休息时长</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => breakDuration > 1 && setBreakDuration(breakDuration - 1)}
            className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800
              text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700
              transition-colors text-sm flex items-center justify-center"
          >
            −
          </button>
          <span className="w-12 text-center text-sm font-medium text-gray-700 dark:text-gray-200 tabular-nums">
            {breakDuration} 分钟
          </span>
          <button
            onClick={() => breakDuration < 30 && setBreakDuration(breakDuration + 1)}
            className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800
              text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700
              transition-colors text-sm flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Auto start */}
      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-600 dark:text-gray-300">自动开始下一阶段</label>
        <button
          onClick={() => setAutoStartNext(!autoStartNext)}
          className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 ${
            autoStartNext ? 'bg-red-400' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm
              transition-transform duration-200 ${
                autoStartNext ? 'translate-x-[18px]' : 'translate-x-0'
              }`}
          />
        </button>
      </div>
    </div>
  );
}
