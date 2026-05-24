import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TimerState, TimerPhase, DailyStats } from '../types';

const getTodayStr = () => new Date().toISOString().slice(0, 10);

const createDefaultStats = (): DailyStats => ({
  date: getTodayStr(),
  completedPomodoros: 0,
  totalFocusMinutes: 0,
});

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      // Timer state
      phase: 'focus',
      status: 'idle',
      timeLeft: 45 * 60,
      totalSeconds: 45 * 60,
      completedSessions: 0,

      // Settings
      focusDuration: 45,
      breakDuration: 5,
      autoStartNext: true,
      volume: 0.7,
      focusRingtone: null,
      breakRingtone: null,
      whiteNoise: null,
      whiteNoiseVolume: 0.3,

      // Stats
      dailyStats: createDefaultStats(),

      // Theme
      theme: 'light',

      start: () => {
        const { status, timeLeft, phase, focusDuration, breakDuration } = get();
        if (status === 'running') return;

        if (status === 'idle') {
          const duration = phase === 'focus' ? focusDuration : breakDuration;
          set({ timeLeft: duration * 60, totalSeconds: duration * 60 });
        }

        set({ status: 'running' });
      },

      pause: () => set({ status: 'paused' }),

      reset: () => {
        const { phase, focusDuration, breakDuration } = get();
        const duration = phase === 'focus' ? focusDuration : breakDuration;
        set({
          status: 'idle',
          timeLeft: duration * 60,
          totalSeconds: duration * 60,
        });
      },

      tick: () => {
        const { status, timeLeft } = get();
        if (status !== 'running') return;

        if (timeLeft <= 1) {
          set({ timeLeft: 0, status: 'idle' });
          return;
        }

        set({ timeLeft: timeLeft - 1 });
      },

      switchPhase: () => {
        const { phase, focusDuration, breakDuration, completedSessions, autoStartNext } = get();

        if (phase === 'focus') {
          const newSessions = completedSessions + 1;
          get().updateDailyStats(focusDuration);
          set({
            phase: 'break',
            timeLeft: breakDuration * 60,
            totalSeconds: breakDuration * 60,
            status: autoStartNext ? 'running' : 'idle',
            completedSessions: newSessions,
          });
        } else {
          set({
            phase: 'focus',
            timeLeft: focusDuration * 60,
            totalSeconds: focusDuration * 60,
            status: autoStartNext ? 'running' : 'idle',
          });
        }
      },

      // Settings actions
      setFocusDuration: (minutes) => {
        set({ focusDuration: minutes });
        const { phase, status } = get();
        if (phase === 'focus' && status === 'idle') {
          set({ timeLeft: minutes * 60, totalSeconds: minutes * 60 });
        }
      },

      setBreakDuration: (minutes) => {
        set({ breakDuration: minutes });
        const { phase, status } = get();
        if (phase === 'break' && status === 'idle') {
          set({ timeLeft: minutes * 60, totalSeconds: minutes * 60 });
        }
      },

      setAutoStartNext: (auto) => set({ autoStartNext: auto }),
      setVolume: (volume) => set({ volume }),
      setFocusRingtone: (file) => set({ focusRingtone: file }),
      setBreakRingtone: (file) => set({ breakRingtone: file }),
      setWhiteNoise: (file) => set({ whiteNoise: file }),
      setWhiteNoiseVolume: (v) => set({ whiteNoiseVolume: v }),

      updateDailyStats: (completedMinutes) => {
        const { dailyStats } = get();
        const today = getTodayStr();

        if (dailyStats.date !== today) {
          set({
            dailyStats: {
              date: today,
              completedPomodoros: 1,
              totalFocusMinutes: completedMinutes,
            },
          });
        } else {
          set({
            dailyStats: {
              ...dailyStats,
              completedPomodoros: dailyStats.completedPomodoros + 1,
              totalFocusMinutes: dailyStats.totalFocusMinutes + completedMinutes,
            },
          });
        }
      },

      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'pomodoro-timer-storage',
      partialize: (state) => ({
        focusDuration: state.focusDuration,
        breakDuration: state.breakDuration,
        autoStartNext: state.autoStartNext,
        volume: state.volume,
        focusRingtone: state.focusRingtone,
        breakRingtone: state.breakRingtone,
        whiteNoise: state.whiteNoise,
        whiteNoiseVolume: state.whiteNoiseVolume,
        theme: state.theme,
        dailyStats: state.dailyStats,
        completedSessions: state.completedSessions,
      }),
    }
  )
);
