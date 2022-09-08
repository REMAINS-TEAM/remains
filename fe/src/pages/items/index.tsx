import React from 'react';
import MainLayout from 'layouts/MainLayout';
import * as styles from './styles';
import { Box } from '@mui/material';
import ItemCards from 'pages/Categories/units/ItemCards';
import itemsApi from 'store/api/items';
import { useSelector } from 'react-redux';
import { getIsAdmin, getPaidStatus } from 'store/selectors/user';
import Header from 'components/Header';
import EmptyState from 'components/EmptyState';
import Container from 'components/Container';
import InfiniteScroll from 'components/InfiniteScroll';
import Spinner from 'components/Spinner';
import { Item } from 'store/slices/items';

const ItemsPage = () => {
  const isPaid = useSelector(getPaidStatus);
  const isAdmin = useSelector(getIsAdmin);

  return (
    <MainLayout>
      <Box sx={styles.contentContainer}>
        <Header title={'Все товары'} withBackButton />
        <InfiniteScroll<Item>
          hasMore={isPaid || isAdmin}
          loadHook={itemsApi.useGetItemsQuery}
          showEndText={isPaid || isAdmin}
          endText="Вы просмотрели все товары"
          emptyStateComponent={
            <Container sx={{ width: '100%', height: '100%' }}>
              <EmptyState
                text={'Здесь пока нет товаров'}
                description={`Будьте первыми. Перейдите в категорию и нажмите "Добавить"`}
              />
            </Container>
          }
        >
          {({ items, loadHookResult: { isFetching } }) => (
            <ItemCards items={items} isFetching={isFetching} />
          )}
        </InfiniteScroll>
      </Box>
    </MainLayout>
  );
};

export default ItemsPage;
