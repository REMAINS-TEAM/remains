import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import AppHeader from 'components/AppHeader';
import AppFooter from 'components/AppFooter';
import * as styles from './styles';
import { useDispatch } from 'react-redux';
import { setGeneralVariables } from 'store/slices/general';
import { LS_KEY_DEMO, LS_KEY_TOKEN } from 'global/constants';

const AppLayout: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setGeneralVariables({
        [LS_KEY_DEMO]: localStorage.getItem(LS_KEY_DEMO),
        [LS_KEY_TOKEN]: localStorage.getItem(LS_KEY_TOKEN),
      }),
    );
  }, []);

  return (
    <>
      <AppHeader />
      <Box sx={styles.contentContainer}>{children}</Box>
      <AppFooter />
    </>
  );
};

export default AppLayout;
