import { Box, Button, TextField } from '@mui/material';

import styles from './UploadForm.module.scss';
import { useVideoState } from '../../context/VideoStateContext';

const UploadForm = (): JSX.Element => {
  const { inputValue, setInputValue, setVideoUrl } = useVideoState();

  const handleSubmit = () => {
    setVideoUrl(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'video/mp4') {
      const objectURL = URL.createObjectURL(file);
      setVideoUrl(objectURL);
      setInputValue('');
    }
  };

  return (
    <Box className={styles.form}>
      <TextField
        label="Video URL"
        fullWidth
        value={inputValue}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Box className={styles.buttonRow}>
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          Загрузить по ссылке
        </Button>

        <Button variant="outlined" component="label">
          Загрузить локальный .mp4
          <input type="file" accept="video/mp4" hidden onChange={handleFileUpload} />
        </Button>
      </Box>
    </Box>
  );
};

export default UploadForm;
