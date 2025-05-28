import React from 'react';
import IconButton from '@mui/material/IconButton';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { useVideo } from '../../../context/VideoElementContext';
import { SEEK_DURATION } from '../../../utils/constants';

const RewindButtons: JSX.Element = () => {
  const { videoRef } = useVideo();

  const seek = (seconds: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    video.currentTime = Math.min(Math.max(0, video.currentTime + seconds), video.duration);
  };

  return (
    <>
      <IconButton onClick={() => seek(-SEEK_DURATION)} color="primary">
        <FastRewindIcon />
      </IconButton>
      <IconButton onClick={() => seek(SEEK_DURATION)} color="primary">
        <FastForwardIcon />
      </IconButton>
    </>
  );
};

export default RewindButtons;
