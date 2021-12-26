import React, { ReactNode } from 'react';
import * as styles from './styles';
import { Box, Typography } from '@mui/material';
import Container from 'components/Container';
import CategoriesTree from 'components/CategoriesTree';
import categoriesApi from 'store/api/categories';

function WithMenuLayout({ children }: { children: ReactNode }) {
  const {
    data: categories,
    isLoading,
  } = categoriesApi.useGetAllCategoriesQuery({ parentId: 0 });

  return (
    <>
      <Box sx={styles.menuWithHeaderContainer}>
        <Box sx={styles.header}>
          <Typography>Категории</Typography>
        </Box>
        <Container sx={styles.menuContainer}>
          <CategoriesTree initCategories={categories} isLoading={isLoading} />
        </Container>
      </Box>
      {children}
    </>
  );
}

export default React.memo(WithMenuLayout);
