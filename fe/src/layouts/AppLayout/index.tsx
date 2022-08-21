import React from 'react';
import { Box } from '@mui/material';
import AppHeader from 'components/AppHeader';
import AppFooter from 'components/AppFooter';
import * as styles from './styles';

const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <AppHeader />
      <Box sx={styles.contentContainer}>{children}</Box>
      <AppFooter />
    </>
  );
};

export default AppLayout;
