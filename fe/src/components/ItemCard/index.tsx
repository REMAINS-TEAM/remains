import React from 'react';
import * as styles from './styles';
import Container from 'components/Container';
import { Item } from 'store/slices/items';
import ItemImage from 'components/ItemCard/units/ItemImage';
import { Box, Typography } from '@mui/material';

function ItemCard({ item }: { item: Item }) {
  return (
    <Container sx={styles.itemContainer}>
      <ItemImage src={item.images[0]} />
      <Box>
        <Typography variant="body1">{item.title}</Typography>
        <Typography variant="body2">{item.description}</Typography>
      </Box>
    </Container>
  );
}

export default React.memo(ItemCard);
