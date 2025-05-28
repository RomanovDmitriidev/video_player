import { Container } from '@mui/material';

import AppHeader from './components/AppHeader/AppHeader';
import DropZone from './components/DropZone/DropZone';
import UploadForm from './components/UploadForm/UploadForm';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import styles from './App.module.scss';
import { VideoElementProvider } from './context/VideoElementContext';
import { ThemeType } from './models/themeScheme';

type AppProps = {
  toggleTheme: () => void;
  theme: ThemeType;
};

const App: React.FC<AppProps> = ({ toggleTheme, theme }) => {
  return (
    <Container maxWidth="md" className={styles.app}>
      <AppHeader toggleTheme={toggleTheme} theme={theme} />
      <DropZone />
      <UploadForm />
      <VideoElementProvider>
        <VideoPlayer />
      </VideoElementProvider>
    </Container>
  );
};

export default App;
