import React from 'react';
import { Item } from 'store/slices/items';
import ItemCard from 'components/ItemCard';
import { Box } from '@mui/material';
import * as styles from './styles';

function ItemCards({
  items,
  isLoading,
}: {
  items?: Item[];
  isLoading: boolean;
}) {
  if (!items) return null;

  return (
    <Box sx={styles.itemsContainer}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </Box>
  );
}

export default React.memo(ItemCards);
