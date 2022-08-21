import React from 'react';
import { Box } from '@mui/material';
import AppHeader from 'components/AppHeader';
import AppFooter from 'components/AppFooter';
import { APP_FOOTER_HEIGHT, APP_HEADER_HEIGHT } from 'global/constants';

const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <AppHeader />
      <Box
        sx={{
          position: 'relative',
          top: APP_HEADER_HEIGHT,
          height: `calc(100vh - ${APP_HEADER_HEIGHT}px - ${APP_FOOTER_HEIGHT}px)`,
          overflowY: 'auto',
        }}
      >
        {children}
      </Box>
      <AppFooter />
    </>
  );
};

export default AppLayout;
