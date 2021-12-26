import React from 'react';
import { Item } from 'store/slices/items';
import ItemCard from 'components/ItemCard';
import { Skeleton } from '@mui/lab';
import { Box } from '@mui/material';

function ItemCards({
  items,
  isLoading,
}: {
  items?: Item[];
  isLoading: boolean;
}) {
  if (!items) return null;

  if (isLoading)
    return (
      <>
        {Array.from(new Array(3)).map((_, i) => (
          <Skeleton key={i} sx={{ height: '150px', transform: 'none' }} />
        ))}
      </>
    );

  if (items.length === 0)
    return <Box>Здесь пусто. Выберите подкатегорию, если есть</Box>;

  return (
    <>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </>
  );
}

export default React.memo(ItemCards);
