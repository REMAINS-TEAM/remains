import React from 'react';
import * as styles from './styles';
import { Box, Typography } from '@mui/material';
import categoriesApi from 'store/api/categories';
import CategoriesTree from 'components/CategoriesTree';
import MainLayout from 'layouts/MainLayout';
import Container from 'components/Container';
import BreadCrumbs from 'components/BreadCrumbs';

// TODO linter

function MainPage() {
  const {
    data: categories,
    isLoading,
  } = categoriesApi.useGetAllCategoriesQuery({ parentId: 0 });

  return (
    <MainLayout>
      <Box sx={styles.mainContainer}>
        <Box sx={styles.leftContainer}>
          <Box sx={styles.header}>
            <Typography>Категории</Typography>
          </Box>

          <Container sx={styles.menuContainer}>
            <CategoriesTree initCategories={categories} isLoading={isLoading} />
          </Container>
        </Box>
        <Box sx={styles.contentContainer}>
          <Box sx={styles.header}>
            <BreadCrumbs />
          </Box>
          <Box sx={styles.itemsContainer}>
            <Container sx={styles.itemContainer}>Карточка товара 1</Container>
            <Container sx={styles.itemContainer}>Карточка товара 2</Container>
            <Container sx={styles.itemContainer}>Карточка товара 3</Container>
            <Container sx={styles.itemContainer}>Карточка товара 4</Container>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default React.memo(MainPage);
