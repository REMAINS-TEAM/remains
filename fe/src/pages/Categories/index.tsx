import React from 'react';
import MainLayout from 'layouts/MainLayout';
import WithMenuLayout from 'layouts/WithMenuLayout';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import * as styles from './styles';
import { Box } from '@mui/material';
import BreadCrumbs from 'components/BreadCrumbs';
import itemsApi from 'store/api/items';
import routes from 'routes';
import ItemCards from 'pages/Categories/units/ItemCards';
import EmptyState from 'components/EmptyState';
import categoriesApi from 'store/api/categories';

function Categories() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { data: fetchedItems, isFetching } = itemsApi.useGetCategoryItemsQuery({
    categoryId,
    limit: 10,
    offset: 0,
  });

  const { data: category } = categoriesApi.useGetCategoryByIdQuery(
    categoryId || 0,
    {
      skip: !categoryId,
    },
  );

  const selectCategoryHandler = (categoryId: number) => {
    navigate(generatePath(routes.category, { categoryId: String(categoryId) }));
  };

  return (
    <MainLayout>
      <WithMenuLayout onSelect={selectCategoryHandler}>
        <Box sx={styles.contentContainer}>
          {!categoryId ? (
            <EmptyState
              text={'Выберите категорию'}
              description={
                'Посмотрите, что тут есть, переключая категории слева'
              }
            />
          ) : (
            <>
              <Box sx={styles.header}>
                <BreadCrumbs data={category?.tree} />
              </Box>
              <ItemCards items={fetchedItems} isLoading={isFetching} />
            </>
          )}
        </Box>
      </WithMenuLayout>
    </MainLayout>
  );
}

export default React.memo(Categories);
