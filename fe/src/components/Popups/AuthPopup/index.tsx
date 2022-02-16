import React, { useEffect } from 'react';
import Popup from 'components/Popups/index';
import { InputAdornment, TextField } from '@mui/material';
import { AuthPopupProps } from '../../Popups/AuthPopup/types';
import {
  PersonRounded as UserIcon,
  VpnKey as PasswordIcon,
} from '@mui/icons-material';
import usersApi from 'store/api/user';
import { Controller, useForm } from 'react-hook-form';
import useResponseNotifications from 'hooks/useResponseNotifications';

function AuthPopup({ open, setOpen }: AuthPopupProps) {
  const [loginRequest, result] = usersApi.useLoginMutation();

  useResponseNotifications({
    result,
    onSuccess: () => setOpen(false),
    onSuccessText: 'Вы успешно вошли в свой аккаунт',
    onErrorText: 'Неверный логин и/или пароль',
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  // TODO: регистрация
  // TODO: валидация

  const onSubmit = ({
    login,
    password,
  }: {
    login: string;
    password: string;
  }) => {
    loginRequest({
      login,
      password,
    });
  };

  return (
    <Popup
      title={`Авторизация`}
      okButtonText={'Войти'}
      closeWhenSubmit={false}
      onOkClick={handleSubmit(onSubmit)}
      {...{ open, setOpen }}
    >
      <form>
        <Controller
          name="login"
          control={control}
          render={({ field }) => (
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
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
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
              {...field}
            />
          )}
        />
      </form>
    </Popup>
  );
}

export default React.memo(AuthPopup);
