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
import { QueryStatus } from '@reduxjs/toolkit/query';
import useNotification, { notificationType } from 'hooks/useNotification';

function AuthPopup({ open, setOpen }: AuthPopupProps) {
  const notification = useNotification();

  const [loginRequest, result] = usersApi.useLoginMutation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  // TODO: регистрация
  // TODO: валидация
  // TODO: обработка если неправильный пароль

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

  useEffect(() => {
    if (result.status === QueryStatus.fulfilled) {
      notification.show(
        notificationType.SUCCESS,
        'Вы успешно вошли в свой аккаунт',
      );
    } else if (result.status === QueryStatus.rejected) {
      notification.show(notificationType.ERROR, 'Неверный логин и/или пароль');
    }
  }, [result.status]);

  return (
    <Popup
      title={`Авторизация`}
      okButtonText={'Войти'}
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
