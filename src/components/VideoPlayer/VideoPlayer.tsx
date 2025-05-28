import React, { useEffect, useRef, useState } from 'react';
import styles from './VideoPlayer.module.scss';
import CircularProgress from '@mui/material/CircularProgress';

import ControlPanel from '../ControlPanel/ControlPanel';
import PlayOverlay from '../PlayOverlay/PlayOverlay';

import {
  DEFAULT_QUALITY,
  LOADING_SPINNER_SIZE,
  CONTROL_PANEL_HIDING_DELAY
} from '../../utils/constants';
import { useVideo } from '../../context/VideoElementContext';
import { attachVideoEvents, VideoEventType } from '../../utils/videoEvents';
import { initHls, getHlsLevels } from '../../utils/hlsManager';
import { useKeyboardSeek } from '../../hooks/useKeyboardSeek';
import { useTogglePlay } from '../../hooks/useVideoActions';
import { useIsPlaying } from '../../hooks/useVideoProperty';
import { useVideoState } from '../../context/VideoStateContext';

const VideoPlayer = (): JSX.Element => {
  const { videoUrl } = useVideoState();
  const { videoRef, containerRef } = useVideo();
  const [selectedQuality, setSelectedQuality] = useState(DEFAULT_QUALITY);
  const [isLoading, setIsLoading] = useState(true);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const togglePlay = useTogglePlay();
  const isPlaying = useIsPlaying();

  useKeyboardSeek();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof videoUrl !== 'string') return;

    const detachEvents = attachVideoEvents(videoRef, {
      [VideoEventType.Waiting]: () => setIsLoading(true),
      [VideoEventType.CanPlay]: () => setIsLoading(false),
      [VideoEventType.CanPlayThrough]: () => setIsLoading(false),
      [VideoEventType.Playing]: () => setIsLoading(false)
    });

    const cleanup = initHls(video, videoUrl, () => {
      setSelectedQuality(DEFAULT_QUALITY);
    });

    return () => {
      detachEvents?.();
      cleanup?.();
    };
  }, [videoUrl]);

  const resetHideControlsTimer = () => {
    if (!isPlaying) {
      setIsControlsVisible(true);
      return;
    }

    setIsControlsVisible(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => {
      setIsControlsVisible(false);
    }, CONTROL_PANEL_HIDING_DELAY);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleUserActivity = () => resetHideControlsTimer();
    container.addEventListener('mousemove', handleUserActivity);

    return () => {
      container.removeEventListener('mousemove', handleUserActivity);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleUserActivity = () => resetHideControlsTimer();
    container.addEventListener('mousemove', handleUserActivity);

    return () => {
      container.removeEventListener('mousemove', handleUserActivity);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [isPlaying]);

  const handleVideoClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(`.${styles.playButton}`)) return;
    togglePlay();
  };

  return (
    <div
      className={styles.wrapper}
      ref={containerRef}
      tabIndex={0}
      onClick={() => containerRef.current?.focus()}
    >
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          tabIndex={0}
          autoFocus
          onClick={handleVideoClick}
          className={styles.video}
          controls={false}
        />

        {<PlayOverlay />}

        {isLoading && (
          <div className={styles.loader}>
            <CircularProgress size={LOADING_SPINNER_SIZE} />
          </div>
        )}

        <ControlPanel
          selectedQuality={selectedQuality}
          setSelectedQuality={setSelectedQuality}
          isControlsVisible={isControlsVisible || !isPlaying}
          levels={getHlsLevels()}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
