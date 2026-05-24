export type TimerPhase = 'focus' | 'break';

export type TimerStatus = 'idle' | 'running' | 'paused';

export interface TimerSettings {
  focusDuration: number; // minutes
  breakDuration: number; // minutes
  autoStartNext: boolean;
  volume: number; // 0-1
  focusRingtone: string | null;
  breakRingtone: string | null;
  whiteNoise: string | null;
  whiteNoiseVolume: number;
}

export interface DailyStats {
  date: string;
  completedPomodoros: number;
  totalFocusMinutes: number;
}

export interface TimerState extends TimerSettings {
  // Timer state
  phase: TimerPhase;
  status: TimerStatus;
  timeLeft: number; // seconds
  totalSeconds: number; // total seconds for current phase
  completedSessions: number;

  // Actions
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  switchPhase: () => void;

  // Settings
  setFocusDuration: (minutes: number) => void;
  setBreakDuration: (minutes: number) => void;
  setAutoStartNext: (auto: boolean) => void;
  setVolume: (volume: number) => void;
  setFocusRingtone: (file: string | null) => void;
  setBreakRingtone: (file: string | null) => void;
  setWhiteNoise: (file: string | null) => void;
  setWhiteNoiseVolume: (volume: number) => void;

  // Stats
  dailyStats: DailyStats;
  updateDailyStats: (completedMinutes: number) => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
