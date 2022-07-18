import React, { useState } from 'react';
import * as styles from './styles';
import Container from 'components/Container';
import { Item } from 'store/slices/items';
import ItemImage from 'components/ItemCard/units/ItemImage';
import { Box, Button, Tooltip, Typography, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreHoriz as DotsIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import PopupMenu from 'components/PopupMenu';
import MenuItem from 'components/PopupMenu/units/MenuItem';
import { BACKEND_URL } from 'global/constants';
import {
  getCurrentUser,
  getPaymentNotExpiredStatus,
} from 'store/selectors/user';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';

function ItemCard({
  item,
  onDeleteClick,
}: {
  item: Item;
  onDeleteClick: (id: number) => void;
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useSelector(getCurrentUser);
  const paymentNotExpired = useSelector(getPaymentNotExpiredStatus);

  const [dotsButtonRef, setDotsButtonRef] = useState<HTMLElement | null>(null);

  const dotsClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setDotsButtonRef(event.currentTarget);
  };

  const itemDetailsClickHandler = () => {
    navigate(generatePath(routes.item, { itemId: String(item.id) }));
  };

  const itemEditClickHandler = (itemId: number) => {
    return (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      // TODO
    };
  };
  const itemDeleteClickHandler = (itemId: number) => {
    return (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      onDeleteClick(itemId);
    };
  };

  return (
    <Container sx={styles.itemContainer} onClick={itemDetailsClickHandler}>
      <Box sx={styles.leftSide}>
        <ItemImage
          src={`${BACKEND_URL}/content/items/${item.id}/${item.images[0]}`}
        />
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
          {item.userId === user?.id && paymentNotExpired && (
            <Tooltip title={'Этот товар добавили Вы. Нажмите, чтобы ред.'}>
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
          <Button
            variant="contained"
            size={'small'}
            onClick={itemDetailsClickHandler}
          >
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
          onClick={itemEditClickHandler(item.id)}
          Icon={EditIcon}
          label={'Редактировать'}
        />
        <MenuItem
          onClick={itemDeleteClickHandler(item.id)}
          Icon={DeleteIcon}
          label={'Удалить'}
          color={theme.palette.error.main}
          confirm
        />
      </PopupMenu>
    </Container>
  );
}

export default React.memo(ItemCard);
