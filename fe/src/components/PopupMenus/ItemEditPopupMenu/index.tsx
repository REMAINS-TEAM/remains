import React, { useEffect, useState } from 'react';
import PopupMenu from '../';
import MenuItem from '../units/MenuItem';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreHoriz as DotsIcon,
} from '@mui/icons-material';
import { ItemEditPopupMenuProps } from './types';
import { Box, Tooltip, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import itemsApi from 'store/api/items';
import useResponseNotifications from 'hooks/useResponseNotifications';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';
import routes from 'routes';
import AddEditItemPopup from 'components/Popups/AddEditItemPopup';

const ItemEditPopupMenu = ({ item, sx }: ItemEditPopupMenuProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [dotsButtonRef, setDotsButtonRef] = useState<HTMLElement | null>(null);
  const [addEditItemPopupOpen, setAddEditItemPopupOpen] = useState(false);

  const [deleteItemRequest, deleteResult] = itemsApi.useDeleteItemMutation();

  useResponseNotifications({
    result: deleteResult,
    onSuccessText: 'Товар удален!',
    onErrorText: 'Ошибка при удалении товара',
  });

  // redirect after deleting
  useEffect(() => {
    if (!deleteResult.isSuccess || !location.pathname.includes('items/'))
      return;

    navigate(
      generatePath(routes.category, { categoryId: String(item.categoryId) }),
    );
  }, [deleteResult.isSuccess, location]);

  const dotsClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setDotsButtonRef(event.currentTarget);
  };

  const itemEditClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAddEditItemPopupOpen(true);
  };

  const itemDeleteClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    deleteItemRequest(item.id);
  };

  return (
    <Box sx={sx}>
      <Tooltip title={'Этот товар добавили Вы. Нажмите, чтобы ред.'}>
        <IconButton color="secondary" onClick={dotsClickHandler}>
          <DotsIcon />
        </IconButton>
      </Tooltip>
      <PopupMenu
        id={`ItemMenu${item.id}`}
        anchorEl={dotsButtonRef}
        setAnchorEl={setDotsButtonRef}
      >
        <MenuItem
          onClick={itemEditClickHandler}
          Icon={EditIcon}
          label={'Редактировать'}
        />
        <MenuItem
          onClick={itemDeleteClickHandler}
          Icon={DeleteIcon}
          label={'Удалить'}
          color={theme.palette.error.main}
          confirm
        />
      </PopupMenu>
      <AddEditItemPopup
        open={addEditItemPopupOpen}
        setOpen={setAddEditItemPopupOpen}
        itemId={item.id}
      />
    </Box>
  );
};

export default ItemEditPopupMenu;
