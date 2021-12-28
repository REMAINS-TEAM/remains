import React from 'react';
import * as styles from './styles';
import Container from 'components/Container';
import { Item } from 'store/slices/items';
import ItemImage from 'components/ItemCard/units/ItemImage';
import { Box, Button, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { MoreHoriz as DotsIcon } from '@mui/icons-material';

function ItemCard({ item }: { item: Item }) {
  return (
    <Container sx={styles.itemContainer}>
      <Box sx={styles.leftSide}>
        <ItemImage src={item.images[0]} />
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {item.title}
          </Typography>
          <Typography variant="body2" color={'secondary'}>
            {item.description}
          </Typography>
        </Box>
      </Box>

      <Box sx={styles.rightSide}>
        <Box sx={styles.rightTop}>
          <IconButton color="secondary" sx={styles.dotsButton}>
            <DotsIcon />
          </IconButton>
          <Typography variant="h5">
            {item.price.toLocaleString('ru')} ₽
          </Typography>
          <Button variant="outlined">Просмотреть</Button>
        </Box>
        <Box sx={styles.rightBottom}>
          <Typography variant="caption" color="secondary">
            {new Date(item.updatedAt).toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default React.memo(ItemCard);
