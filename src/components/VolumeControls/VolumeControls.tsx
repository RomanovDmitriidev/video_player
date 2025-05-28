import React from 'react';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import styles from './VolumeControls.module.scss';
import { MAX_VOLUME_VALUE, MIN_VOLUME_VALUE } from '../../utils/constants';
import { isValidNumber } from '../../utils/helpers';
import { useVideo } from '../../context/VideoElementContext';
import { useVolume, useIsMuted } from '../../hooks/useVideoProperty';

const VolumeControls: React.FC = () => {
  const { videoRef } = useVideo();
  const volume = useVolume();
  const isMuted = useIsMuted();

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
  };

  const handleVolumeChange = (_: Event, value: number | number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const vol = Number(value) / 100;
    video.volume = vol;
    video.muted = vol === 0;
  };

  return (
    <>
      <IconButton onClick={toggleMute} color="primary">
        {isMuted || volume === MIN_VOLUME_VALUE ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </IconButton>
      <Slider
        className={styles.volumeSlider}
        min={MIN_VOLUME_VALUE}
        max={MAX_VOLUME_VALUE}
        value={isValidNumber(volume * 100) ? volume * 100 : 100}
        onChange={handleVolumeChange}
        aria-label="volume"
      />
    </>
  );
};

export default VolumeControls;
