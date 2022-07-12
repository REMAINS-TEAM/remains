import React from 'react';

import { Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import {
  Logout as LogoutIcon,
  PersonOutline as ProfileIcon,
} from '@mui/icons-material';
import usersApi from 'store/api/user';
import useResponseNotifications from 'hooks/useResponseNotifications';
import { useNavigate } from 'react-router-dom';
import routes from 'routes';

function ProfileMenu({
  anchorEl,
  setAnchorEl,
}: {
  anchorEl: HTMLElement | null;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
}) {
  const navigate = useNavigate();
  const [logoutRequest, result] = usersApi.useLogoutMutation();

  useResponseNotifications({
    result,
    onSuccessText: 'Вы успешно вышли из аккаунта',
  });

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickProfile = () => {
    navigate(routes.profile);
  };

  const handleClickLogout = () => {
    logoutRequest();
    navigate('/', { replace: true });
  };

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
      <MenuItem onClick={handleClickProfile}>
        <ListItemIcon>
          <ProfileIcon />
        </ListItemIcon>
        Профиль
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClickLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Выйти
      </MenuItem>
    </Menu>
  );
}

export default React.memo(ProfileMenu);
