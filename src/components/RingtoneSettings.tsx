import { useRef } from 'react';
import { useTimerStore } from '../store/useTimerStore';
import { useTestRingtone } from '../hooks/useAudio';

export default function RingtoneSettings() {
  const focusRingtone = useTimerStore((s) => s.focusRingtone);
  const breakRingtone = useTimerStore((s) => s.breakRingtone);
  const volume = useTimerStore((s) => s.volume);
  const setFocusRingtone = useTimerStore((s) => s.setFocusRingtone);
  const setBreakRingtone = useTimerStore((s) => s.setBreakRingtone);
  const setVolume = useTimerStore((s) => s.setVolume);
  const { testPlay, stopTest } = useTestRingtone();

  const focusInputRef = useRef<HTMLInputElement>(null);
  const breakInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (
    file: File | undefined,
    setter: (path: string | null) => void
  ) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setter(url);
    }
  };

  const getFileName = (url: string | null) => {
    if (!url) return '未选择';
    if (url.startsWith('blob:')) return '已选择自定义铃声';
    return url.split('/').pop() || '已选择';
  };

  return (
    <div className="w-full max-w-sm space-y-5">
      <h3 className="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
        铃声设置
      </h3>

      {/* Focus ringtone */}
      <div className="space-y-2">
        <label className="text-sm text-gray-600 dark:text-gray-300">专注结束铃声</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => focusInputRef.current?.click()}
            className="flex-1 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              text-xs text-gray-500 dark:text-gray-400 text-left truncate
              hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
          >
            {getFileName(focusRingtone)}
          </button>
          <button
            onClick={() => testPlay(focusRingtone, volume)}
            className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800
              text-xs text-gray-500 dark:text-gray-400
              hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            测试
          </button>
          <input
            ref={focusInputRef}
            type="file"
            accept=".mp3,.wav,.ogg"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files?.[0], setFocusRingtone)}
          />
        </div>
      </div>

      {/* Break ringtone */}
      <div className="space-y-2">
        <label className="text-sm text-gray-600 dark:text-gray-300">休息结束提示音</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => breakInputRef.current?.click()}
            className="flex-1 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              text-xs text-gray-500 dark:text-gray-400 text-left truncate
              hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
          >
            {getFileName(breakRingtone)}
          </button>
          <button
            onClick={() => testPlay(breakRingtone, volume)}
            className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800
              text-xs text-gray-500 dark:text-gray-400
              hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            测试
          </button>
          <input
            ref={breakInputRef}
            type="file"
            accept=".mp3,.wav,.ogg"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files?.[0], setBreakRingtone)}
          />
        </div>
      </div>

      {/* Volume */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-600 dark:text-gray-300">音量</label>
          <span className="text-xs text-gray-400 tabular-nums">{Math.round(volume * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(volume * 100)}
          onChange={(e) => setVolume(Number(e.target.value) / 100)}
          className="w-full h-1.5 rounded-full appearance-none bg-gray-200 dark:bg-gray-700
            accent-red-400 outline-none cursor-pointer"
        />
      </div>
    </div>
  );
}
