import { useEffect, useRef, useCallback } from 'react';
import { useTimerStore } from '../store/useTimerStore';

export function useWhiteNoise() {
  const { whiteNoise, whiteNoiseVolume, status } = useTimerStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (whiteNoise && status === 'running') {
      try {
        const audio = new Audio(whiteNoise);
        audio.loop = true;
        audio.volume = whiteNoiseVolume;
        audio.play().catch(() => {});
        audioRef.current = audio;
      } catch {}
    } else if (audioRef.current) {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [whiteNoise, status === 'running']);

  // Volume control with Web Audio API when available
  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = whiteNoiseVolume;
    } else if (audioRef.current) {
      audioRef.current.volume = whiteNoiseVolume;
    }
  }, [whiteNoiseVolume]);

  return { isPlaying: !!audioRef.current && !audioRef.current.paused };
}

export function useTestRingtone() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const testPlay = useCallback((file: string | null, volume: number) => {
    if (!file) return;
    // Stop previous test
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    const audio = new Audio(file);
    audio.volume = volume;
    audio.play().catch(() => {});
    audioRef.current = audio;
  }, []);

  const stopTest = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return { testPlay, stopTest };
}
