import React, { ReactNode, useEffect } from 'react';
import * as styles from './styles';
import { Box } from '@mui/material';
import { LS_KEY_DEMO, LS_KEY_TOKEN } from 'global/constants';
import { useNavigate } from 'react-router-dom';

function MainLayout({
  children,
  forAll,
}: {
  children: ReactNode;
  forAll?: boolean;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (forAll) return;

    const demo = !!localStorage.getItem(LS_KEY_DEMO);
    const token = !!localStorage.getItem(LS_KEY_TOKEN);

    if (!demo && !token) navigate('/welcome');
  }, [forAll]);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.center}>{children}</Box>
    </Box>
  );
}

export default React.memo(MainLayout);
