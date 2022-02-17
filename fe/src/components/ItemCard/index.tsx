import React, { useState } from 'react';
import * as styles from './styles';
import Container from 'components/Container';
import { Item } from 'store/slices/items';
import ItemImage from 'components/ItemCard/units/ItemImage';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreHoriz as DotsIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import PopupMenu from 'components/PopupMenu';
import MenuItem from 'components/PopupMenu/units/MenuItem';

function ItemCard({
  item,
  onDeleteClick,
}: {
  item: Item;
  onDeleteClick: (id: number) => void;
}) {
  const user = useSelector((state: RootState) => state.user);

  const [dotsButtonRef, setDotsButtonRef] = useState<HTMLElement | null>(null);

  const dotsClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    setDotsButtonRef(event.currentTarget);
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
            <Tooltip
              title={'Этот товар добавили Вы. Нажмите для редактирования.'}
            >
              <IconButton
                color="secondary"
                sx={styles.dotsButton}
                onClick={dotsClickHandler}
              >
                <DotsIcon />
              </IconButton>
            </Tooltip>
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
        id={`ItemMenu${item.id}`}
        anchorEl={dotsButtonRef}
        setAnchorEl={setDotsButtonRef}
      >
        <MenuItem
          onClick={() => null}
          Icon={EditIcon}
          label={'Редактировать'}
        />
        <MenuItem
          onClick={() => onDeleteClick(item.id)}
          Icon={DeleteIcon}
          label={'Удалить'}
          color={'error'}
          confirm
        />
      </PopupMenu>
    </Container>
  );
}

export default React.memo(ItemCard);
