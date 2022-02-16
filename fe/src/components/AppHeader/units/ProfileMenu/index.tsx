import React, { useEffect } from 'react';

import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Logout } from '@mui/icons-material';
import usersApi from 'store/api/user';
import { QueryStatus } from '@reduxjs/toolkit/query';
import useNotification, { notificationType } from 'hooks/useNotification';

function ProfileMenu({
  anchorEl,
  setAnchorEl,
}: {
  anchorEl: HTMLElement | null;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
}) {
  const notification = useNotification();

  const [logoutRequest, result] = usersApi.useLogoutMutation();

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogout = () => {
    logoutRequest();
  };

  useEffect(() => {
    if (result.status === QueryStatus.fulfilled) {
      notification.show(
        notificationType.SUCCESS,
        'Вы успешно вышли из аккаунта',
      );
    } else if (result.status === QueryStatus.rejected) {
      notification.show(notificationType.ERROR, 'Что-то пошло не так');
    }
  }, [result.status]);

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem>
        <Avatar /> Профиль
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClickLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Выйти
      </MenuItem>
    </Menu>
  );
}

export default React.memo(ProfileMenu);
