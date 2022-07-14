import React, { ReactNode } from 'react';
import * as styles from './styles';
import { Box, Typography } from '@mui/material';
import Container from 'components/Container';
import CategoriesTree from 'components/CategoriesTree';

function WithMenuLayout({
  children,
  onSelect,
}: {
  children: ReactNode;
  onSelect?: (id: number) => void;
}) {
  return (
    <>
      <Box sx={styles.menuWithHeaderContainer}>
        <Box sx={styles.header}>
          <Typography>Категории</Typography>
        </Box>
        <Container sx={styles.menuContainer}>
          <CategoriesTree />
        </Container>
      </Box>
      {children}
    </>
  );
}

export default React.memo(WithMenuLayout);
