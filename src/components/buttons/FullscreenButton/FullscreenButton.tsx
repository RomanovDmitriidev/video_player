import React from 'react';
import IconButton from '@mui/material/IconButton';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useToggleFullscreen } from '../../../hooks/useVideoActions';

const FullscreenButton: React.FC = () => {
  const toggleFullscreen = useToggleFullscreen();
  return (
    <IconButton onClick={toggleFullscreen} color="primary">
      <FullscreenIcon />
    </IconButton>
  );
};

export default FullscreenButton;
