import { useSyncExternalStore, useCallback, useState, useEffect } from 'react';
import { useVideo } from '../context/VideoElementContext';

export function useVideoProperty<T>(
  event: keyof HTMLMediaElementEventMap | (keyof HTMLMediaElementEventMap)[],
  selector: (video: HTMLVideoElement) => T,
  fallback: T
): T {
  const { videoRef } = useVideo();

  const subscribe = (callback: () => void) => {
    const video = videoRef.current;
    if (!video) return () => {};

    const events = Array.isArray(event) ? event : [event];

    events.forEach(ev => video.addEventListener(ev, callback));
    return () => {
      events.forEach(ev => video.removeEventListener(ev, callback));
    };
  };

  const getSnapshot = useCallback(() => {
    const video = videoRef.current;
    return video ? selector(video) : fallback;
  }, [videoRef]);

  return useSyncExternalStore(subscribe, getSnapshot);
}

export const useIsPlaying = () => useVideoProperty(['play', 'pause'], v => !v.paused);
export const useIsMuted = () => useVideoProperty('volumechange', v => v.muted, false);

export const useVolume = () => useVideoProperty('volumechange', v => v.volume, 1);

export const useProgress = () => {
  const { videoRef } = useVideo();
  const [state, setState] = useState({
    currentTime: 0,
    duration: 0,
    percent: 0
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const update = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      const percent = duration ? (currentTime / duration) * 100 : 0;

      setState({ currentTime, duration, percent });
    };

    video.addEventListener('timeupdate', update);

    return () => {
      video.removeEventListener('timeupdate', update);
    };
  }, [videoRef]);

  return state;
};
