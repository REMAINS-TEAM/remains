import React from 'react';
import { Item } from 'store/slices/items';
import ItemCard from 'components/ItemCard';
import EmptyState from 'components/EmptyState';

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
      <EmptyState text={'Здесь пусто. Выберите подкатегорию, если есть'} />
    );

  return (
    <>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </>
  );
}

export default React.memo(ItemCards);
