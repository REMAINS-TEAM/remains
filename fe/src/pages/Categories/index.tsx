import React from 'react';
import MainLayout from 'layouts/MainLayout';
import WithMenuLayout from 'layouts/WithMenuLayout';
import { useParams } from 'react-router-dom';
import * as styles from './styles';
import { Box } from '@mui/material';
import BreadCrumbs from 'components/BreadCrumbs';
import ItemCard from 'components/ItemCard';
import itemsApi from 'store/api/items';

// TODO: загружать только если в категории есть элементы

function Categories() {
  const { categoryId } = useParams();
  const { data, isFetching } = itemsApi.useGetCategoryItemsQuery({
    categoryId,
  });

  console.log('data', data);

  return (
    <MainLayout>
      <WithMenuLayout>
        <Box sx={styles.contentContainer}>
          {!categoryId ? (
            <Box>Выберите категорию (здесь компонент как в МФ был)</Box>
          ) : (
            <>
              <Box sx={styles.header}>
                <BreadCrumbs />
              </Box>
              <Box sx={styles.itemsContainer}>
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
              </Box>
            </>
          )}
        </Box>
      </WithMenuLayout>
    </MainLayout>
  );
}

export default React.memo(Categories);
