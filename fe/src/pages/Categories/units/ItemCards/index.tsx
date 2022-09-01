import React, { forwardRef } from 'react';
import { Item } from 'store/slices/items';
import ItemCard from 'components/ItemCard';
import { Box } from '@mui/material';
import * as styles from './styles';

interface Props {
  items?: Item[];
  isLoading: boolean;
}

const ItemCards = forwardRef<HTMLDivElement, Props>(
  ({ items = [], isLoading }, ref) => {
    if (!items.length && !isLoading) return null;

    return (
      <Box sx={styles.itemsContainer} ref={ref}>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
        {isLoading && 'Загрузка...'}
      </Box>
    );
  },
);

export default React.memo(ItemCards);
