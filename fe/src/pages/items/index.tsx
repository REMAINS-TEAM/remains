import React, { useEffect, useRef, useState } from 'react';
import MainLayout from 'layouts/MainLayout';
import * as styles from './styles';
import { Box } from '@mui/material';
import ItemCards from 'pages/Categories/units/ItemCards';
import NotificationPlate from 'components/NotificationPlate';
import itemsApi from 'store/api/items';
import { useSelector } from 'react-redux';
import { getPaidStatus } from 'store/selectors/user';
import Header from 'components/Header';
import EmptyState from 'components/EmptyState';
import Container from 'components/Container';
import useLazyLoading from 'hooks/useLazyLoading';
import { Item } from 'store/slices/items';

const ItemsPage = () => {
  const isPaid = useSelector(getPaidStatus);

  const { handleScroll, items, isFetching } = useLazyLoading<Item>(
    itemsApi.useGetItemsQuery,
  );

  return (
    <MainLayout onScroll={handleScroll}>
      <Box sx={styles.contentContainer}>
        <Header title="Все товары" withBackButton />
        {items?.length || isFetching ? (
          <>
            <ItemCards items={items} isLoading={isFetching} />
            {!isPaid && !isFetching && (
              <NotificationPlate
                title="Оплатите сервис, чтобы видеть все товары"
                color="secondary"
                sx={{ display: 'flex', justifyContent: 'center', pb: 4 }}
              />
            )}
          </>
        ) : (
          <Container sx={{ width: '100%', height: '100%' }}>
            <EmptyState
              text={'Здесь пока нет товаров'}
              description={`Будьте первыми. Перейдите в категорию и нажмите "Добавить"`}
            />
          </Container>
        )}
      </Box>
    </MainLayout>
  );
};

export default ItemsPage;
