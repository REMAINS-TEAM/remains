import React from 'react';
import MainLayout from 'layouts/MainLayout';
import * as styles from './styles';
import { Box } from '@mui/material';
import ItemCards from 'pages/Categories/units/ItemCards';
import NotificationPlate from 'components/NotificationPlate';
import itemsApi from 'store/api/items';
import { useSelector } from 'react-redux';
import { getIsAdmin, getPaidStatus } from 'store/selectors/user';
import Header from 'components/Header';
import EmptyState from 'components/EmptyState';
import Container from 'components/Container';
import useInfinityScroll from 'hooks/useInfinityScroll';
import userApi from 'store/api/user';

const ItemsPage = () => {
  const { isSuccess: isUserSuccess, isError: isUserError } =
    userApi.useMeQuery();
  const isGetUserFinished = isUserSuccess || isUserError;

  const isPaid = useSelector(getPaidStatus);
  const isAdmin = useSelector(getIsAdmin);

  const { handleScroll, items, isSuccess, isFetchingPrev, isFetchingNext } =
    useInfinityScroll(itemsApi.useGetItemsQuery);

  return (
    <MainLayout onScroll={handleScroll}>
      <Box sx={styles.contentContainer}>
        <Header title="Все товары" withBackButton />
        <ItemCards
          items={items}
          isFetchingPrev={isFetchingPrev}
          isFetchingNext={isFetchingNext}
        />
        {isGetUserFinished && !isPaid && !isAdmin && !!items.length && (
          <NotificationPlate
            title="Оплатите сервис, чтобы видеть все товары"
            color="secondary"
            sx={{ display: 'flex', justifyContent: 'center', pb: 4 }}
          />
        )}
        {isSuccess && !items?.length && (
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
