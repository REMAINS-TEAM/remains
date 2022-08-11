import React from 'react';
import MainLayout from 'layouts/MainLayout';
import * as styles from './styles';
import { Box } from '@mui/material';
import ItemCards from 'pages/Categories/units/ItemCards';
import NotificationPlate from 'components/NotificationPlate';
import itemsApi from 'store/api/items';
import { useSelector } from 'react-redux';
import { getPaidStatus } from 'store/selectors/user';

const ItemsPage = () => {
  const isPaid = useSelector(getPaidStatus);

  const {
    data: categoryItems,
    isFetching: isItemFetching,
    error: getCategoryItemsError,
  } = itemsApi.useGetItemsQuery({
    limit: 100, // TODO: lazy loading
    offset: 0,
  });

  return (
    <MainLayout>
      <Box sx={styles.contentContainer}>
        <ItemCards items={categoryItems} isLoading={isItemFetching} />
        {!isPaid && (
          <NotificationPlate
            title="Без оплаты Вы видите не все товары"
            color="secondary"
            sx={{ display: 'flex', justifyContent: 'center', pb: 4 }}
          />
        )}
      </Box>
    </MainLayout>
  );
};

export default ItemsPage;
