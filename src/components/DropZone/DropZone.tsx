import { useCallback } from 'react';
import { Paper, Typography } from '@mui/material';
import styles from './DropZone.module.scss';
import { useVideoState } from '../../context/VideoStateContext';

const DropZone = (): JSX.Element => {
  const { setVideoUrl, setInputValue } = useVideoState();

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      const file = e.dataTransfer.files?.[0];
      const text = e.dataTransfer.getData('text/plain');

      if (file && file.type === 'video/mp4') {
        const objectURL = URL.createObjectURL(file);
        setVideoUrl(objectURL);
        setInputValue('');
      } else if (text) {
        const trimmed = text.trim();
        setInputValue(trimmed);
        setVideoUrl(trimmed);
      }
    },
    [setVideoUrl, setInputValue]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Paper
      elevation={3}
      className={styles.dropZone}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Typography variant="body1" align="center">
        Перетащи сюда ссылку или файл .mp4
      </Typography>
    </Paper>
  );
};

export default DropZone;
