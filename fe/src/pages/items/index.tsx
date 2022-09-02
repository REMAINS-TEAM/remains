import React, { useCallback, useMemo, useState } from 'react';
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
import useInfinityScroll from 'hooks/useInfinityScroll';

const ItemsPage = () => {
  const isPaid = useSelector(getPaidStatus);
  const { handleScroll, items, isFetching } = useInfinityScroll(
    itemsApi.useGetItemsQuery,
  );

  return (
    <MainLayout onScroll={handleScroll}>
      <Box sx={styles.contentContainer}>
        <Header title="Все товары" withBackButton />
        {items?.length ? (
          <>
            <ItemCards items={items} />
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
