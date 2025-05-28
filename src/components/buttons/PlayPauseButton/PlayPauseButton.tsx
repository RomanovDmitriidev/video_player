import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useIsPlaying } from '../../../hooks/useVideoProperty';
import { useTogglePlay } from '../../../hooks/useVideoActions';

const PlayPauseButton = () => {
  const isPlaying = useIsPlaying();
  const togglePlay = useTogglePlay();
  return (
    <IconButton onClick={() => togglePlay()} color="primary">
      {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
    </IconButton>
  );
};

export default PlayPauseButton;
