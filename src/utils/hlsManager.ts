import Hls, { Level } from 'hls.js';

let hlsInstance: Hls | null = null;
let currentLevels: Level[] = [];
let selectedQuality = -1;

export const initHls = (
  video: HTMLVideoElement | null,
  src: string,
  onLevelsUpdated?: (levels: Level[]) => void
) => {
  if (!video || typeof src !== 'string') return null;

  if (hlsInstance) {
    hlsInstance.destroy();
  }

  if (Hls.isSupported() && src.endsWith('.m3u8')) {
    hlsInstance = new Hls();
    hlsInstance.loadSource(src);
    hlsInstance.attachMedia(video);

    hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
      currentLevels = hlsInstance!.levels;
      selectedQuality = -1;
      onLevelsUpdated?.(currentLevels);
    });

    hlsInstance.on(Hls.Events.LEVELS_UPDATED, (_, data) => {
      currentLevels = data.levels;
      selectedQuality = -1;
      onLevelsUpdated?.(currentLevels);
    });
  } else {
    video.src = src;
    hlsInstance = null;
    currentLevels = [];
    selectedQuality = -1;
  }

  return () => destroyHls();
};

export const setQuality = (level: number) => {
  if (hlsInstance) {
    hlsInstance.currentLevel = level;
    selectedQuality = level;
  }
};

export const getHlsLevels = () => currentLevels;

export const getSelectedQuality = () => selectedQuality;

export const getHlsInstance = () => hlsInstance;

export const destroyHls = () => {
  hlsInstance?.destroy();
  hlsInstance = null;
  currentLevels = [];
  selectedQuality = -1;
};
