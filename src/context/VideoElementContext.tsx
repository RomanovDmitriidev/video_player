import React, { createContext, useContext, useRef, RefObject } from 'react';

interface VideoElementContextType {
  videoRef: RefObject<HTMLVideoElement>;
  containerRef: RefObject<HTMLDivElement>;
}

const VideoElementContext = createContext<VideoElementContextType | null>(null);

export const useVideo = (): VideoElementContextType => {
  const context = useContext(VideoElementContext);
  if (!context) {
    throw new Error('useVideoElement must be used within a VideoElementProvider');
  }
  return context;
};

export const VideoElementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <VideoElementContext.Provider value={{ videoRef, containerRef }}>
      {children}
    </VideoElementContext.Provider>
  );
};
