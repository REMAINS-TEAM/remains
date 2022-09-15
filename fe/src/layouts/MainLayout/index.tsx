import React, { forwardRef, useEffect } from 'react';
import * as styles from './styles';
import { Box } from '@mui/material';
import { LS_KEY_DEMO, LS_KEY_TOKEN } from 'global/constants';
import { useNavigate } from 'react-router-dom';
import routes from 'routes';
import { MainLayoutProps } from './types';

const MainLayout = forwardRef<HTMLDivElement, MainLayoutProps>(
  ({ children, forAll, onScroll, onTouchMove }, ref) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (forAll) return;

      const demo = !!localStorage.getItem(LS_KEY_DEMO);
      const token = !!localStorage.getItem(LS_KEY_TOKEN);

      if (!demo && !token) navigate(routes.welcome);
    }, [forAll]);

    return (
      <Box
        ref={ref}
        sx={styles.root}
        onScroll={onScroll}
        onTouchMove={onTouchMove}
        id="main-layout"
      >
        <Box sx={styles.center}>{children}</Box>
      </Box>
    );
  },
);

export default MainLayout;
