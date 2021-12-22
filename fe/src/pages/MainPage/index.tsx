import React from 'react';
import * as styles from './styles';
import { Box } from '@mui/material';
import categoriesApi from 'store/api/categories';
import CategoriesTree from 'components/CategoriesTree';
import MainLayout from 'layouts/MainLayout';
import Container from 'components/Container';

// TODO linter

// TODO: загружать в начале только категории верхнего уровня, а потом подгружать при клике с бэка

function MainPage() {
  const {
    data: categories,
    isLoading,
  } = categoriesApi.useGetAllCategoriesQuery({ parentId: 0 });

  return (
    <MainLayout>
      <Box sx={styles.mainContainer}>
        <Container sx={styles.menuContainer}>
          <CategoriesTree initCategories={categories} isLoading={isLoading} />
        </Container>
        <Container sx={styles.contentContainer}>
          <p>Тут сразу карточки товара (не категорий) как в днс</p>
        </Container>
      </Box>
    </MainLayout>
  );
}

export default React.memo(MainPage);
