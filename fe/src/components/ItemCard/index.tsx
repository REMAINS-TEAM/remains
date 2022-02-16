import React, { useState } from 'react';
import * as styles from './styles';
import Container from 'components/Container';
import { Item } from 'store/slices/items';
import ItemImage from 'components/ItemCard/units/ItemImage';
import { Box, Button, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { MoreHoriz as DotsIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import PopupMenu from 'components/PopupMenu';
import MenuItem from 'components/PopupMenu/units/MenuItem';
import itemsApi from 'store/api/items';
import useResponseNotifications from 'hooks/useResponseNotifications';

function ItemCard({ item }: { item: Item }) {
  const [deleteItemRequest, deleteResult] = itemsApi.useDeleteItemMutation();

  useResponseNotifications({
    result: deleteResult,
    onSuccessText: 'Товар удален"',
    onErrorText: 'Ошибка при удалении товара',
  });

  const user = useSelector((state: RootState) => state.user);

  const [dotsButtonRef, setDotsButtonRef] = useState<HTMLElement | null>(null);

  const dotsClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    setDotsButtonRef(event.currentTarget);
  };

  const deleteHandler = () => {
    deleteItemRequest(item.id);
  };

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
          {item.userId === user?.id && (
            <IconButton
              color="secondary"
              sx={styles.dotsButton}
              onClick={dotsClickHandler}
            >
              <DotsIcon />
            </IconButton>
          )}

          <Typography
            variant="h5"
            sx={{ fontFamily: 'inherit', lineHeight: 1 }}
          >
            {item.price.toLocaleString('ru')} ₽
          </Typography>
          <Button variant="contained" size={'small'}>
            Подробнее
          </Button>
        </Box>
        <Box sx={styles.rightBottom}>
          <Typography variant="caption" color="secondary">
            {new Date(item.updatedAt).toLocaleString()}
          </Typography>
        </Box>
      </Box>
      <PopupMenu
        id={'ItemMenu'}
        anchorEl={dotsButtonRef}
        setAnchorEl={setDotsButtonRef}
      >
        <MenuItem
          onClick={() => null}
          Icon={EditIcon}
          label={'Редактировать'}
        />
        <MenuItem
          onClick={deleteHandler}
          Icon={DeleteIcon}
          label={'Удалить'}
          color={'error'}
        />
      </PopupMenu>
    </Container>
  );
}

export default React.memo(ItemCard);
