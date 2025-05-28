import styles from './ProgressControl.module.scss';
import { Slider, Typography } from '@mui/material';
import { formatTime, isValidNumber } from '../../utils/helpers';
import RewindButtons from '../buttons/RewindButtons/RewindButtons';
import { useVideo } from '../../context/VideoElementContext';
import { useProgress } from '../../hooks/useVideoProperty';

const ProgressControl = (): JSX.Element => {
  const { videoRef } = useVideo();
  const progress = useProgress();
  const { currentTime, duration, percent } = progress ?? {
    currentTime: 0,
    duration: 0,
    percent: 0
  };

  const handleProgressChange = (_: Event, value: number | number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (Number(value) / 100) * video.duration;
    video.currentTime = newTime;
  };

  return (
    <>
      <RewindButtons />
      <Typography
        variant="body2"
        className={styles.time}
        sx={theme => ({
          color: theme.palette.primary.main
        })}
      >
        {isValidNumber(currentTime) ? formatTime(currentTime) : '00:00'} /{' '}
        {isValidNumber(duration) ? formatTime(duration) : '00:00'}
      </Typography>
      <Slider
        className={styles.slider}
        value={isValidNumber(percent) ? percent : 0}
        onChange={handleProgressChange}
        aria-label="progress"
      />
    </>
  );
};

export default ProgressControl;
