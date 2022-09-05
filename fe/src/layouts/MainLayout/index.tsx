import React, { ReactNode, useEffect } from 'react';
import * as styles from './styles';
import { Box } from '@mui/material';
import { LS_KEY_DEMO, LS_KEY_TOKEN } from 'global/constants';
import { useNavigate } from 'react-router-dom';

function MainLayout({
  children,
  forAll,
  onScroll,
  onTouchMove,
}: {
  children: ReactNode;
  forAll?: boolean;
  onScroll?: (e: React.SyntheticEvent) => void;
  onTouchMove?: (e: React.SyntheticEvent) => void;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (forAll) return;

    const demo = !!localStorage.getItem(LS_KEY_DEMO);
    const token = !!localStorage.getItem(LS_KEY_TOKEN);

    if (!demo && !token) navigate('/welcome');
  }, [forAll]);

  return (
    <Box sx={styles.root} onScroll={onScroll} onTouchMove={onTouchMove}>
      <Box sx={styles.center}>{children}</Box>
    </Box>
  );
}

export default React.memo(MainLayout);
