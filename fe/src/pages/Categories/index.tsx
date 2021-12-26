import React from 'react';
import MainLayout from 'layouts/MainLayout';
import WithMenuLayout from 'layouts/WithMenuLayout';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import * as styles from './styles';
import { Box } from '@mui/material';
import BreadCrumbs from 'components/BreadCrumbs';
import ItemCard from 'components/ItemCard';
import itemsApi from 'store/api/items';
import routes from 'routes';
import ItemCards from 'pages/Categories/units/ItemCards';

function Categories() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { data: fetchedItems, isFetching } = itemsApi.useGetCategoryItemsQuery({
    categoryId,
    limit: 10,
    offset: 0,
  });

  const selectCategoryHandler = (categoryId: number) => {
    navigate(generatePath(routes.category, { categoryId: String(categoryId) }));
  };

  return (
    <MainLayout>
      <WithMenuLayout onSelect={selectCategoryHandler}>
        <Box sx={styles.contentContainer}>
          {!categoryId ? (
            <Box>Выберите категорию (здесь компонент как в МФ был)</Box>
          ) : (
            <>
              <Box sx={styles.header}>
                <BreadCrumbs />
              </Box>
              <Box sx={styles.itemsContainer}>
                <ItemCards items={fetchedItems} isLoading={isFetching} />
              </Box>
            </>
          )}
        </Box>
      </WithMenuLayout>
    </MainLayout>
  );
}

export default React.memo(Categories);
