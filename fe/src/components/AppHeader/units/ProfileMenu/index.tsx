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
import { useDispatch, useSelector } from 'react-redux';
import { setGeneralVariables } from 'store/slices/general';
import { LS_KEY_DEMO, LS_KEY_TOKEN } from 'global/constants';
import { getGeneralVariables } from 'store/selectors/general';

function ProfileMenu({
  anchorEl,
  setAnchorEl,
}: {
  anchorEl: HTMLElement | null;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
}) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [logoutRequest, result] = usersApi.useLogoutMutation();

  const general = useSelector(getGeneralVariables);

  useResponseNotifications({
    result,
    onSuccessText: 'Вы успешно вышли из аккаунта',
    onSuccess: () => {
      dispatch(setGeneralVariables({ [LS_KEY_TOKEN]: '' }));
      if (!general[LS_KEY_DEMO]) {
        navigate(routes.welcome, { replace: true });
      }
    },
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
