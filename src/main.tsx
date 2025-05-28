import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { VideoStateProvider } from './context/VideoStateContext';
import { ThemeType } from './models/themeScheme';

const Main = () => {
  const [theme, setTheme] = useState<ThemeType>(ThemeType.Light);

  const toggleTheme = () => {
    setTheme(prev => (prev === ThemeType.Light ? ThemeType.Dark : ThemeType.Light));
  };

  return (
    <ThemeProvider theme={theme === ThemeType.Dark ? darkTheme : lightTheme}>
      <CssBaseline />
      <VideoStateProvider>
        <App theme={theme} toggleTheme={toggleTheme} />
      </VideoStateProvider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
