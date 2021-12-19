import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'store';
import AppLayout from 'layouts/AppLayout';

const theme = createTheme();

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <AppLayout />
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
