import React, { forwardRef } from 'react';
import { Item } from 'store/slices/items';
import ItemCard from 'components/ItemCard';
import { Box } from '@mui/material';
import * as styles from './styles';
import Spinner from 'components/Spinner';

interface Props {
  items?: Item[];
  isFetchingPrev?: boolean;
  isFetchingNext?: boolean;
  isLoading?: boolean; //TODO: delete
}

const ItemCards = forwardRef<HTMLDivElement, Props>(
  ({ items = [], isFetchingPrev, isFetchingNext }, ref) => {
    if (!items.length) return null;

    return (
      <>
        {isFetchingPrev && <Spinner />}
        <Box sx={styles.itemsContainer} ref={ref}>
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </Box>
        {isFetchingNext && <Spinner />}
      </>
    );
  },
);

export default React.memo(ItemCards);
