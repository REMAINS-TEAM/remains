import React, { useState } from 'react';
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

const ItemEditPopupMenu = ({ item, sx }: ItemEditPopupMenuProps) => {
  const theme = useTheme();

  const [dotsButtonRef, setDotsButtonRef] = useState<HTMLElement | null>(null);

  const [deleteItemRequest, deleteResult] = itemsApi.useDeleteItemMutation();

  useResponseNotifications({
    result: deleteResult,
    onSuccessText: 'Товар удален!',
    onErrorText: 'Ошибка при удалении товара',
  });

  const dotsClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setDotsButtonRef(event.currentTarget);
  };

  const itemEditClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    //TODO:
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
    </Box>
  );
};

export default ItemEditPopupMenu;
