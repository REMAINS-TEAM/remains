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

const ItemsPage = () => {
  const isPaid = useSelector(getPaidStatus);
  const [offset, setOffset] = useState(0);

  const LIMIT = 5;
  const PX_TO_END = 400;

  const { data: prevItems, isFetching: isFetchingPrev } =
    itemsApi.useGetItemsQuery(
      {
        limit: LIMIT,
        offset: offset - LIMIT,
      },
      { skip: offset < LIMIT },
    );
  const { data: curItems, isFetching: isFetchingCur } =
    itemsApi.useGetItemsQuery({
      limit: LIMIT,
      offset,
    });
  const { data: nextItems, isFetching: isFetchingNext } =
    itemsApi.useGetItemsQuery({
      limit: LIMIT,
      offset: offset + LIMIT,
    });

  const isFetching = isFetchingPrev || isFetchingCur || isFetchingNext;

  const items = useMemo(() => {
    const arr = new Array(LIMIT * (offset + 1));
    for (const data of [prevItems, curItems, nextItems]) {
      if (data) {
        arr.splice(data.offset, data.list.length, ...data.list);
      }
    }
    return arr;
  }, [offset, prevItems, curItems, nextItems]);

  const handleScroll = useCallback(
    (e: React.SyntheticEvent) => {
      const { scrollTop, scrollHeight, offsetHeight } =
        e.target as HTMLDivElement;

      if (!isFetching && items?.length) {
        if (scrollTop <= PX_TO_END && offset !== 0) {
          setOffset(offset - LIMIT);
        }

        if (
          scrollTop >= scrollHeight - offsetHeight - PX_TO_END &&
          nextItems?.list.length !== 0
        ) {
          setOffset(offset + LIMIT);
        }
      }
    },
    [offset, items, nextItems, isFetching],
  );

  return (
    <MainLayout onScroll={handleScroll}>
      <Box sx={styles.contentContainer}>
        <Header title="Все товары" withBackButton />
        {items?.length || isFetching ? (
          <>
            {/*<button*/}
            {/*  onClick={() => {*/}
            {/*    if (offset !== 0) setOffset((prev) => prev - 5);*/}
            {/*  }}*/}
            {/*>*/}
            {/*  UP*/}
            {/*</button>*/}
            <ItemCards items={items} isLoading={isFetching} />
            {/*<button onClick={() => setOffset((prev) => prev + 5)}>DOWN</button>*/}
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
