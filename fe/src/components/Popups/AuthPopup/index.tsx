import React from 'react';
import Popup from 'components/Popups/index';
import { InputAdornment, TextField } from '@mui/material';
import { AuthPopupProps } from '../../Popups/AuthPopup/types';
import {
  PersonRounded as UserIcon,
  VpnKey as PasswordIcon,
} from '@mui/icons-material';
import usersApi from 'store/api/user';

function AuthPopup({ open, setOpen }: AuthPopupProps) {
  const [loginRequest, result] = usersApi.useLoginMutation();

  const loginClickHandler = () => {
    loginRequest({
      login: 'admin@remains.ru',
      password: '123',
    });
  };

  console.log('res', result.data || 'fail');

  return (
    <Popup
      title={`Авторизация`}
      okButtonText={'Войти'}
      onOkClick={loginClickHandler}
      {...{ open, setOpen }}
    >
      <TextField
        autoFocus
        margin="dense"
        id="login"
        label="Телефон/e-mail"
        type="text"
        fullWidth
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <UserIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        autoFocus
        margin="dense"
        id="password"
        label="Пароль"
        type="password"
        fullWidth
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <PasswordIcon />
            </InputAdornment>
          ),
        }}
      />
    </Popup>
  );
}

export default React.memo(AuthPopup);
