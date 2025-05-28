import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_URL } from '../utils/constants';

interface VideoStateContextType {
  videoUrl: string;
  inputValue: string;
  setVideoUrl: (url: string) => void;
  setInputValue: (value: string) => void;
}

const VideoStateContext = createContext<VideoStateContextType | null>(null);

export const useVideoState = (): VideoStateContextType => {
  const context = useContext(VideoStateContext);
  if (!context) {
    throw new Error('useVideoState must be used within a VideoStateProvider');
  }
  return context;
};

export const VideoStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videoUrl, setVideoUrl] = useState(DEFAULT_URL);
  const [inputValue, setInputValue] = useState(DEFAULT_URL);

  return (
    <VideoStateContext.Provider value={{ videoUrl, inputValue, setVideoUrl, setInputValue }}>
      {children}
    </VideoStateContext.Provider>
  );
};
