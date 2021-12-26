import React from 'react';
import * as styles from './styles';
import Container from 'components/Container';
import { Item } from 'store/slices/items';

function ItemCard({ item }: { item: Item }) {
  return <Container sx={styles.itemContainer}>{item.title}</Container>;
}

export default React.memo(ItemCard);
