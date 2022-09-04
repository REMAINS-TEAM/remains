import React, { forwardRef } from 'react';
import { Item } from 'store/slices/items';
import ItemCard from 'components/ItemCard';
import { Box } from '@mui/material';
import * as styles from './styles';
import Spinner from 'components/Spinner';
import NotificationPlate from 'components/NotificationPlate';
import userApi from 'store/api/user';
import { useSelector } from 'react-redux';
import { getIsAdmin, getPaidStatus } from 'store/selectors/user';

interface Props {
  items?: Item[];
  isFetchingPrev?: boolean;
  isFetchingNext?: boolean;
  hidePayNotification?: boolean;
}

const ItemCards = forwardRef<HTMLDivElement, Props>(
  (
    { items = [], isFetchingPrev, isFetchingNext, hidePayNotification },
    ref,
  ) => {
    const { isSuccess: isUserSuccess, isError: isUserError } =
      userApi.useMeQuery();
    const isGetUserFinished = isUserSuccess || isUserError;

    const isPaid = useSelector(getPaidStatus);
    const isAdmin = useSelector(getIsAdmin);

    return (
      <>
        {isFetchingPrev && <Spinner />}
        <Box sx={styles.itemsContainer} ref={ref}>
          {items?.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </Box>
        {!!items.length && isFetchingNext && <Spinner />}

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
