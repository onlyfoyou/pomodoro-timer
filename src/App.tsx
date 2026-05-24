import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimerStore } from './store/useTimerStore';
import { useTimer } from './hooks/useTimer';
import { useWhiteNoise } from './hooks/useAudio';
import { requestNotificationPermission, sendNotification } from './utils/notifications';
import Header from './components/Header';
import PhaseIndicator from './components/PhaseIndicator';
import Timer from './components/Timer';
import TimerControls from './components/TimerControls';
import Settings from './components/Settings';
import RingtoneSettings from './components/RingtoneSettings';
import Stats from './components/Stats';
import EncouragementModal from './components/EncouragementModal';

export default function App() {
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const theme = useTimerStore((s) => s.theme);
  const focusRingtone = useTimerStore((s) => s.focusRingtone);
  const breakRingtone = useTimerStore((s) => s.breakRingtone);
  const volume = useTimerStore((s) => s.volume);

  const handleFocusComplete = useCallback(() => {
    const sessions = useTimerStore.getState().completedSessions + 1;
    sendNotification('专注完成！', `你已完成第 ${sessions} 轮番茄钟，休息一下吧。`);
    setShowEncouragement(true);
  }, []);

  const {
    status, phase, minutes, seconds, progress, completedSessions,
    start, pause, reset, switchPhase,
  } = useTimer({ onFocusComplete: handleFocusComplete });

  // White noise
  useWhiteNoise();

  // Theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Request notification permission
  useEffect(() => {
    const handler = () => {
      requestNotificationPermission();
      document.removeEventListener('click', handler);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handleEncouragementDismiss = useCallback(() => {
    setShowEncouragement(false);
    switchPhase();
  }, [switchPhase]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (status === 'running') pause(); else start();
      } else if (e.code === 'KeyR') {
        reset();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [status, start, pause, reset]);

  const isFocus = phase === 'focus';

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4 pb-8">
        <PhaseIndicator phase={phase} status={status} />

        <div className="mt-6 mb-6">
          <Timer
            minutes={minutes}
            seconds={seconds}
            progress={progress}
            isFocus={isFocus}
            isRunning={status === 'running'}
          />
        </div>

        <TimerControls
          status={status}
          onStart={start}
          onPause={pause}
          onReset={reset}
        />

        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
          当前第 {completedSessions + 1} 轮
        </p>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="mt-8 text-xs text-gray-400 dark:text-gray-500
            hover:text-gray-600 dark:hover:text-gray-300 transition-colors
            flex items-center gap-1"
        >
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 ${showSettings ? 'rotate-90' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          设置
        </button>

        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full max-w-sm overflow-hidden"
            >
              <div className="mt-6 p-6 rounded-3xl bg-gray-50/80 dark:bg-gray-800/50
                border border-gray-100 dark:border-gray-700/50 space-y-8">
                <Settings />
                <RingtoneSettings />
                <Stats />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="pb-4 text-center text-xs text-gray-300 dark:text-gray-700">
        空格键 开始/暂停 · R 键 重置
      </footer>

      <EncouragementModal
        show={showEncouragement}
        completedSessions={completedSessions + 1}
        onDismiss={handleEncouragementDismiss}
      />
    </div>
  );
}
