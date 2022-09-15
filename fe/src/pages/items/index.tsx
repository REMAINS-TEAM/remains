import React, { useRef, useState } from 'react';
import MainLayout from 'layouts/MainLayout';
import * as styles from './styles';
import { Box } from '@mui/material';
import ItemCards from 'pages/Categories/units/ItemCards';
import itemsApi from 'store/api/items';
import { useSelector } from 'react-redux';
import { getIsAdmin, getPaidStatus } from 'store/selectors/user';
import Header from 'components/Header';
import WithPaginationLayout from 'layouts/WithPaginationLayout';
import { ITEMS_PER_PAGE } from 'global/constants';
import EmptyState from 'components/EmptyState';

const ItemsPage = () => {
  const layoutRef = useRef<HTMLDivElement | null>(null);

  const isPaid = useSelector(getPaidStatus);
  const isAdmin = useSelector(getIsAdmin);

  const [offset, setOffset] = useState(0);
  const { data, isFetching } = itemsApi.useGetItemsQuery({
    limit: ITEMS_PER_PAGE,
    offset,
  });

  const pagesCount = Math.ceil((data?.amount || 0) / ITEMS_PER_PAGE);
  const isHiddenPagination =
    isFetching ||
    !data ||
    data.amount <= ITEMS_PER_PAGE ||
    (!isPaid && !isAdmin);

  const changePage = (page: number) => setOffset((page - 1) * ITEMS_PER_PAGE);

  return (
    <MainLayout ref={layoutRef}>
      <Box sx={styles.contentContainer}>
        <Header title="Все товары" withBackButton />
        <WithPaginationLayout
          count={pagesCount}
          hidden={isHiddenPagination}
          scrollContainerRef={layoutRef}
          onChangePage={changePage}
        >
          <ItemCards
            items={data?.list}
            isFetching={isFetching}
            emptyState={
              <EmptyState
                text={'Здесь пока нет товаров'}
                description={`Будьте первыми. Перейдите в категорию и нажмите "Добавить"`}
              />
            }
          />
        </WithPaginationLayout>
      </Box>
    </MainLayout>
  );
};

export default ItemsPage;
