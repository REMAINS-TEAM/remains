import React, { useState } from 'react';
import Popup from 'components/Popups/index';
import { Box, Link } from '@mui/material';
import { AuthPopupProps } from './types';
import usersApi from 'store/api/user';
import { Controller, useForm } from 'react-hook-form';
import useResponseNotifications from 'hooks/useResponseNotifications';
import * as styles from './styles';
import MuiPhoneNumber from 'material-ui-phone-number';
import { joiResolver } from '@hookform/resolvers/joi';
import { authSchema } from 'components/Popups/AuthPopup/validation';
import ConfirmPhonePopup from 'components/Popups/ConfirmPhonePopup';

function AuthPopup({ open, setOpen }: AuthPopupProps) {
  const [loginRequest, result] = usersApi.useLoginMutation();
  const [registerMode, setRegisterMode] = useState(false);
  const [confirmCodePopupOpen, setConfirmCodePopupOpen] = useState(false);

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

  const modeClickHandler = () => {
    setRegisterMode((prev) => !prev);
  };

  const onSubmit = ({ phone }: { phone: string }) => {
    // loginRequest({
    //   login: phone,
    //   password: 'test',
    // });
    console.log(phone.replace(/[\D]+/g, ''));
    setConfirmCodePopupOpen(true);
    setOpen(false);
  };

  return (
    <>
      <Popup
        title={`${registerMode ? 'Регистрация' : 'Авторизация'}`}
        okButtonText={`${registerMode ? 'Зарегистрироваться' : 'Войти'}`}
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
          <Link variant="subtitle2" onClick={modeClickHandler}>
            {registerMode
              ? 'У меня уже есть аккаунт'
              : 'Я еще не регистрировался'}
          </Link>
        </Box>
      </Popup>
      <ConfirmPhonePopup
        open={confirmCodePopupOpen}
        setOpen={setConfirmCodePopupOpen}
      />
    </>
  );
}

export default React.memo(AuthPopup);
