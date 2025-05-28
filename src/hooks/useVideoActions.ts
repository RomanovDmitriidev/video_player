import { useVideo } from '../context/VideoElementContext';

export const useTogglePlay = () => {
  const { videoRef } = useVideo();

  return () => {
    const video = videoRef.current;
    if (!video) return;

    video.paused ? video.play() : video.pause();
  };
};

export const useToggleFullscreen = () => {
  const { containerRef } = useVideo();

  return () => {
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };
};
