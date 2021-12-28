import React from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import {
  Inventory2 as ItemAddIcon,
  PlaylistAdd as CategoryAddIcon,
  PlaylistAddCheck as EditCategoryIcon,
  PlaylistRemove as DeleteCategoryIcon,
} from '@mui/icons-material';
import { ActionsButtonsProps } from './types';

function ActionsButtons({ handlers }: ActionsButtonsProps) {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'fixed', bottom: 32, right: 32 }}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction
        title={'Добавить товар в эту категорию'}
        icon={<ItemAddIcon />}
        onClick={handlers.addItemHandler}
      />
      <SpeedDialAction
        title={'Удалить категорию (только для администратора)'}
        icon={<DeleteCategoryIcon />}
      />

      <SpeedDialAction
        title={'Редактировать категорию (только для администратора)'}
        icon={<EditCategoryIcon />}
      />
      <SpeedDialAction
        title={'Добавить подкатегорию (только для администратора)'}
        icon={<CategoryAddIcon />}
      />
    </SpeedDial>
  );
}

export default React.memo(ActionsButtons);
