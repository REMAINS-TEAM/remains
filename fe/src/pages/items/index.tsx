import React, { useState } from 'react';
import MainLayout from 'layouts/MainLayout';
import * as styles from './styles';
import { Box, Pagination } from '@mui/material';
import ItemCards from 'pages/Categories/units/ItemCards';
import itemsApi from 'store/api/items';
import { useSelector } from 'react-redux';
import { getIsAdmin, getPaidStatus } from 'store/selectors/user';
import Header from 'components/Header';

const LIMIT = 5;

const ItemsPage = () => {
  const isPaid = useSelector(getPaidStatus);
  const isAdmin = useSelector(getIsAdmin);

  const [page, setPage] = useState(1);
  const { data, isFetching } = itemsApi.useGetItemsQuery({
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
  });

  const changePage = (e: React.ChangeEvent<unknown>, p: number) => setPage(p);

  return (
    <MainLayout>
      <Box sx={styles.contentContainer}>
        <Header title={'Все товары'} withBackButton />
        <ItemCards items={data?.list} isFetching={isFetching} />
        {!isFetching && data && data.amount > LIMIT && (isPaid || isAdmin) && (
          <Pagination
            sx={{
              mt: 1,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
            color="primary"
            count={Math.ceil(data.amount / LIMIT)}
            page={page}
            onChange={changePage}
          />
        )}
      </Box>
    </MainLayout>
  );
};

export default ItemsPage;
