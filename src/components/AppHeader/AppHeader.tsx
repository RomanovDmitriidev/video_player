import { Box, Typography, Button } from '@mui/material';
import { ThemeScheme } from '../../models/themeScheme';

interface Props {
  theme: ThemeType;
  toggleTheme: () => void;
}

const AppHeader: React.FC<Props> = ({ theme, toggleTheme }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
    <Typography variant="h4">Видеоплеер</Typography>
    <Button onClick={toggleTheme} variant="outlined">
      {ThemeScheme[theme].text}
    </Button>
  </Box>
);

export default AppHeader;
