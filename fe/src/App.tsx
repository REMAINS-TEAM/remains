import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'store';
import mainTheme from 'theme';
import MainNavigation from 'navigation';
import AppLayout from 'layouts/AppLayout';
import MainNotification from 'components/MainNotification';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme(mainTheme);

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppLayout>
            <MainNavigation />
            <MainNotification />
          </AppLayout>
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
