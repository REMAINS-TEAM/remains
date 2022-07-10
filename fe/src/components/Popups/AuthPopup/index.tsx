import React, { useState } from 'react';
import Popup from 'components/Popups/index';
import { Box, InputAdornment, Link, TextField } from '@mui/material';
import { AuthPopupProps } from './types';
import {
  PersonRounded as UserIcon,
  Phone as PhoneIcon,
  VpnKey as PasswordIcon,
} from '@mui/icons-material';
import usersApi from 'store/api/user';
import { Controller, useForm } from 'react-hook-form';
import useResponseNotifications from 'hooks/useResponseNotifications';
import * as styles from './styles';
import RegisterPopup from 'components/Popups/RegisterPopup';
import { fields } from 'components/Popups/RegisterPopup/fields';
import TextMaskInput from 'components/TextMaskInput';
import MuiPhoneNumber from 'material-ui-phone-number';
import { joiResolver } from '@hookform/resolvers/joi';
import { registerSchema } from 'components/Popups/RegisterPopup/validation';
import { authSchema } from 'components/Popups/AuthPopup/validation';

function AuthPopup({ open, setOpen }: AuthPopupProps) {
  const [loginRequest, result] = usersApi.useLoginMutation();
  const [registerPopupOpen, setRegisterPopupOpen] = useState(false);

  useResponseNotifications({
    result,
    onSuccess: () => setOpen(false),
    onSuccessText: 'Вы успешно вошли в свой аккаунт',
    onErrorText: 'Неверный логин и/или пароль',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(authSchema),
    defaultValues: {
      phone: '',
    },
  });

  // TODO: валидация

  const registerClickHandler = () => {
    setOpen(false);
    setRegisterPopupOpen(true);
  };

  const onSubmit = ({ phone }: { phone: string }) => {
    // loginRequest({
    //   login: phone,
    //   password: 'test',
    // });
    console.log(phone.replace(/[\D]+/g, ''));
  };

  return (
    <>
      <Popup
        title={`Авторизация`}
        okButtonText={'Войти'}
        closeWhenSubmit={false}
        onOkClick={handleSubmit(onSubmit)}
        {...{ open, setOpen }}
      >
        <form>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <MuiPhoneNumber
                sx={{ minWidth: '250px' }}
                autoFocus
                margin="dense"
                id="phone"
                label="Телефон"
                type="text"
                fullWidth
                variant="outlined"
                defaultCountry={'ru'}
                helperText={!!errors.phone && 'Введите корректный номер'}
                error={!!errors.phone}
                {...field}
              />
            )}
          />
        </form>
        <Box sx={styles.link}>
          <Link variant="subtitle2" onClick={registerClickHandler}>
            Я еще не регистрировался...
          </Link>
        </Box>
      </Popup>
      <RegisterPopup open={registerPopupOpen} setOpen={setRegisterPopupOpen} />
    </>
  );
}

export default React.memo(AuthPopup);
