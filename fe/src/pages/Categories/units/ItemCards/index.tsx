import React, { forwardRef, useEffect, useState } from 'react';
import { Item } from 'store/slices/items';
import ItemCard from 'components/ItemCard';
import { Box } from '@mui/material';
import * as styles from './styles';
import Spinner from 'components/Spinner';
import NotificationPlate from 'components/NotificationPlate';
import userApi from 'store/api/user';
import { useSelector } from 'react-redux';
import { getIsAdmin, getPaidStatus } from 'store/selectors/user';
import { useLocation } from 'react-router';

interface Props {
  items?: Item[];
  isFetchingCur?: boolean;
  isFetchingNext?: boolean;
  hidePayNotification?: boolean;
}

const ItemCards = forwardRef<HTMLDivElement, Props>(
  ({ items = [], isFetchingCur, isFetchingNext, hidePayNotification }, ref) => {
    const { isSuccess: isUserSuccess, isError: isUserError } =
      userApi.useMeQuery();
    const isGetUserFinished = isUserSuccess || isUserError;

    const isPaid = useSelector(getPaidStatus);
    const isAdmin = useSelector(getIsAdmin);

    let location = useLocation();
    const [data, setData] = useState<Item[]>([]);

    useEffect(() => setData([]), [location]);
    useEffect(() => {
      if (!isFetchingCur && !isFetchingNext) setData(items);
    }, [items, isFetchingCur, isFetchingNext]);

    if (isFetchingCur) return <Spinner />;

    return (
      <>
        <Box sx={styles.itemsContainer} ref={ref}>
          {data?.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </Box>
        {isFetchingNext && <Spinner />}

        {!hidePayNotification &&
          isGetUserFinished &&
          !isPaid &&
          !isAdmin &&
          !!items.length && (
            <NotificationPlate
              title="Оплатите сервис, чтобы видеть все товары"
              color="secondary"
              sx={{ display: 'flex', justifyContent: 'center', pb: 4 }}
            />
          )}
      </>
    );
  },
);

export default React.memo(ItemCards);
