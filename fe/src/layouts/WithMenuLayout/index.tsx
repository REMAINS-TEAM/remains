import React, { ReactNode } from 'react';
import * as styles from './styles';
import { Box, Typography } from '@mui/material';
import Container from 'components/Container';
import CategoriesTree from 'components/CategoriesTree';
import { Category } from 'store/slices/categories';

function WithMenuLayout({
  children,
  onSelect,
}: {
  children: ReactNode;
  onSelect?: (tree: Category[]) => void;
}) {
  return (
    <>
      <Box sx={styles.menuWithHeaderContainer}>
        <Box sx={styles.header}>
          <Typography>Категории</Typography>
        </Box>
        <Container sx={styles.menuContainer}>
          <CategoriesTree onSelect={onSelect} />
        </Container>
      </Box>
      {children}
    </>
  );
}

export default React.memo(WithMenuLayout);
