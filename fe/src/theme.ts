import { ThemeOptions } from '@mui/material';

const defaultTheme: ThemeOptions = {
  palette: {
    primary: {
      main: '#495c9c',
      // main: '#5b889e',
    },
    secondary: {
      main: 'rgba(10, 10, 10, 0.7)',
    },
  },
  typography: {
    h1: { fontSize: '1.5rem' },
    h2: { fontSize: '1.3rem' },
    h3: { fontSize: '1rem' },
    h4: { fontSize: '0.5rem' },
  },
};

export default defaultTheme;
