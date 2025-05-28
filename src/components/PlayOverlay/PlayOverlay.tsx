import React from 'react';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import styles from './PlayOverlay.module.scss';
import { useTogglePlay } from '../../hooks/useVideoActions';
import { useVideo } from '../../context/VideoElementContext';

const PlayOverlay: React.FC = () => {
  const togglePlay = useTogglePlay();
  const { videoRef } = useVideo();

  const isPaused = videoRef.current?.paused;

  if (!isPaused) return null;

  return (
    <div className={styles.overlayPlay}>
      <IconButton
        onClick={togglePlay}
        size="large"
        sx={theme => ({
          pointerEvents: 'auto',
          borderRadius: '50%',
          width: 80,
          height: 80,
          fontSize: 48,
          backgroundColor: theme.palette.primary.main + '44',
          color: theme.palette.primary.main,
          boxShadow: `0 0 0 10px ${theme.palette.primary.main}33`,
          '&:hover': {
            backgroundColor: theme.palette.primary.main + '66',
            boxShadow: `0 0 0 14px ${theme.palette.primary.main}44`
          }
        })}
      >
        <PlayArrowIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
};

export default PlayOverlay;
