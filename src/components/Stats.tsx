import { useTimerStore } from '../store/useTimerStore';

export default function Stats() {
  const completedSessions = useTimerStore((s) => s.completedSessions);
  const dailyStats = useTimerStore((s) => s.dailyStats);

  return (
    <div className="w-full max-w-sm space-y-4">
      <h3 className="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
        今日统计
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-4 text-center">
          <div className="text-2xl font-semibold text-gray-700 dark:text-gray-200 tabular-nums">
            {dailyStats.completedPomodoros}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            完成番茄
          </div>
        </div>

        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-4 text-center">
          <div className="text-2xl font-semibold text-gray-700 dark:text-gray-200 tabular-nums">
            {dailyStats.totalFocusMinutes}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            专注分钟
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-4 text-center">
        <div className="text-2xl font-semibold text-red-400 tabular-nums">
          {completedSessions}
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          总完成轮次
        </div>
      </div>
    </div>
  );
}
