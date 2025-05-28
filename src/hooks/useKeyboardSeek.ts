import { useEffect } from 'react';
import { useVideo } from '../context/VideoElementContext';
import { SEEK_DURATION, VOLUME_STEP } from '../utils/constants';

export const useKeyboardSeek = () => {
  const { videoRef, containerRef } = useVideo();

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          video.paused ? video.play() : video.pause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - SEEK_DURATION);
          break;
        case 'ArrowRight':
          e.preventDefault();
          video.currentTime = Math.min(video.duration, video.currentTime + SEEK_DURATION);
          break;
        case 'ArrowUp':
          e.preventDefault();
          video.volume = Math.min(1, video.volume + VOLUME_STEP);
          break;
        case 'ArrowDown':
          e.preventDefault();
          video.volume = Math.max(0, video.volume - VOLUME_STEP);
          break;
        case 'Enter':
          if (!document.fullscreenElement) {
            container.requestFullscreen();
          }
          break;
        case 'Escape':
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [videoRef, containerRef]);
};
