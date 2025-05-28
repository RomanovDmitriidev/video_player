export enum VideoEventType {
  Waiting = 'waiting',
  CanPlay = 'canplay',
  CanPlayThrough = 'canplaythrough',
  Playing = 'playing'
}

type EventCallback = (ref: HTMLVideoElement) => void;

export const attachVideoEvents = (
  ref: React.RefObject<HTMLVideoElement>,
  handlers: Partial<Record<VideoEventType, EventCallback>>
) => {
  const video = ref.current;
  if (!video) return;

  const listeners: [VideoEventType, EventListener][] = [];

  Object.entries(handlers).forEach(([event, cb]) => {
    const handler = () => cb?.(video);
    video.addEventListener(event, handler);
    listeners.push([event as VideoEventType, handler]);
  });

  return () => {
    listeners.forEach(([event, handler]) => {
      video.removeEventListener(event, handler);
    });
  };
};
