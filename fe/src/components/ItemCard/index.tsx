import React from 'react';
import * as styles from './styles';
import Container from 'components/Container';

function ItemCard() {
  return <Container sx={styles.itemContainer}>Карточка товара 1</Container>;
}

export default React.memo(ItemCard);
