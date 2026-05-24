import { useEffect, useRef, useCallback } from 'react';
import { useTimerStore } from '../store/useTimerStore';

interface UseTimerOptions {
  onFocusComplete?: () => void;
}

export function useTimer(options: UseTimerOptions = {}) {
  const {
    status, phase, timeLeft, totalSeconds, completedSessions,
    start, pause, reset, tick, switchPhase,
  } = useTimerStore();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer tick
  useEffect(() => {
    if (status === 'running') {
      intervalRef.current = setInterval(() => {
        tick();
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [status, tick]);

  // Detect time reaching 0
  const prevTimeLeftRef = useRef(timeLeft);
  useEffect(() => {
    const prev = prevTimeLeftRef.current;
    prevTimeLeftRef.current = timeLeft;

    if (prev > 0 && timeLeft === 0) {
      const currentPhase = useTimerStore.getState().phase;
      const { focusRingtone, breakRingtone, volume } = useTimerStore.getState();

      // Play ringtone for current phase end
      const ringtone = currentPhase === 'focus' ? focusRingtone : breakRingtone;
      if (ringtone) {
        try {
          const audio = new Audio(ringtone);
          audio.volume = volume;
          audio.play().catch(() => {});
        } catch {}
      }

      if (currentPhase === 'focus' && options.onFocusComplete) {
        options.onFocusComplete();
      } else if (currentPhase === 'break') {
        switchPhase();
      }
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = totalSeconds > 0 ? timeLeft / totalSeconds : 1;

  return {
    status,
    phase,
    timeLeft,
    totalSeconds,
    minutes,
    seconds,
    progress,
    completedSessions,
    start,
    pause,
    reset,
    switchPhase,
  };
}
