import React from 'react';
import { Item } from 'store/slices/items';
import ItemCard from 'components/ItemCard';
import EmptyState from 'components/EmptyState';
import { Box, Button } from '@mui/material';
import * as styles from './styles';

function ItemCards({
  items,
  isLoading,
}: {
  items?: Item[];
  isLoading: boolean;
}) {
  if (!items) return null;

  // Моргает при быстром интернете (лучше сделать общий лоадер вверху)
  // if (isLoading)
  //   return (
  //     <>
  //       {Array.from(new Array(3)).map((_, i) => (
  //         <Skeleton key={i} sx={{ height: '150px', transform: 'none' }} />
  //       ))}
  //     </>
  //   );

  if (items.length === 0)
    return (
      <EmptyState
        text={'Здесь пока нет товаров'}
        description={'Выберите подкатегорию или добавьте сюда что-нибудь'}
      >
        <Button variant={'contained'} onClick={() => null}>
          Добавить
        </Button>
      </EmptyState>
    );

  return (
    <Box sx={styles.itemsContainer}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </Box>
  );
}

export default React.memo(ItemCards);
