import React from 'react';
import { Item } from 'store/slices/items';
import ItemCard from 'components/ItemCard';
import { Box } from '@mui/material';
import * as styles from './styles';
import itemsApi from 'store/api/items';
import useResponseNotifications from 'hooks/useResponseNotifications';

function ItemCards({
  items = [],
  isLoading,
}: {
  items?: Item[];
  isLoading: boolean;
}) {
  const [deleteItemRequest, deleteResult] = itemsApi.useDeleteItemMutation();

  useResponseNotifications({
    result: deleteResult,
    onSuccessText: 'Товар удален!',
    onErrorText: 'Ошибка при удалении товара',
  });

  const deleteHandler = (id: number) => deleteItemRequest(id);

  if (!items.length && !isLoading) return null;

  return (
    <Box sx={styles.itemsContainer}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onDeleteClick={deleteHandler} />
      ))}
      {isLoading && 'Загрузка...'}
    </Box>
  );
}

export default React.memo(ItemCards);
