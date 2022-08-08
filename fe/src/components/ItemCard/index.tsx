import React from 'react';
import * as styles from './styles';
import Container from 'components/Container';
import { Item } from 'store/slices/items';
import ItemImage from 'components/ItemCard/units/ItemImage';
import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { getCurrentUser, getPaidStatus } from 'store/selectors/user';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import ItemEditPopupMenu from 'components/PopupMenus/ItemEditPopupMenu';
import { standardFormat } from 'utils';

function ItemCard({ item }: { item: Item }) {
  const navigate = useNavigate();
  const user = useSelector(getCurrentUser);
  const isPaid = useSelector(getPaidStatus);

  const itemDetailsClickHandler = () => {
    navigate(generatePath(routes.item, { itemId: String(item.id) }));
  };

  return (
    <Container sx={styles.itemContainer} onClick={itemDetailsClickHandler}>
      <Box sx={styles.leftSide}>
        <ItemImage src={`/api/storage/items/${item.id}/${item.images[0]}`} />
        <Box>
          <Typography variant="body1" component={'h3'} sx={{ mb: 1 }}>
            {item.title}
          </Typography>
          <Typography variant="body2" color={'secondary'}>
            {item.description}
          </Typography>
        </Box>
      </Box>

      <Box sx={styles.rightSide}>
        <Box sx={styles.rightTop}>
          {item.userId === user?.id && isPaid && (
            <ItemEditPopupMenu item={item} sx={styles.dotsButton} />
          )}

          <Typography
            variant="h5"
            sx={{ fontFamily: 'inherit', lineHeight: 1 }}
          >
            {item.price.toLocaleString('ru')} ₽
          </Typography>
          <Button
            aria-controls="details"
            variant="outlined"
            size={'small'}
            onClick={itemDetailsClickHandler}
          >
            Подробнее
          </Button>
        </Box>
        <Box sx={styles.rightBottom}>
          <Typography variant="caption" color="secondary">
            {standardFormat(item.updatedAt, true)}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default React.memo(ItemCard);
