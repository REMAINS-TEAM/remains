import React, { useEffect, useState } from 'react';
import Popup from 'components/Popups/index';
import { AuthPopupProps } from './types';
import usersApi from 'store/api/user';
import { Controller, useForm } from 'react-hook-form';
import MuiPhoneNumber from 'material-ui-phone-number';
import { joiResolver } from '@hookform/resolvers/joi';
import { authSchema } from 'components/Popups/AuthPopup/validation';
import ConfirmPhonePopup from 'components/Popups/ConfirmPhonePopup';
import { onlyNumbers } from 'utils';

function AuthPopup({ open, setOpen }: AuthPopupProps) {
  const [loginRequest, result] = usersApi.useLoginMutation();
  const [confirmCodePopupOpen, setConfirmCodePopupOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm({
    resolver: joiResolver(authSchema),
    defaultValues: {
      phone: '',
    },
  });

  useEffect(() => {
    if (result.error) {
      const error = result.error as { data?: { message?: string } };
      setError('phone', {
        message: error?.data?.message || 'Неизвестная ошибка',
      });
      return;
    }
    if (result.data) {
      setConfirmCodePopupOpen(true);
      setOpen(false);
    }
  }, [result]);

  const onSubmit = ({ phone }: { phone: string }) => {
    loginRequest({
      phone: onlyNumbers(phone),
    });
  };

  return (
    <>
      <Popup
        title={'Регистрация/вход'}
        okButtonText={'OK'}
        closeWhenSubmit={false}
        onOkClick={handleSubmit(onSubmit)}
        {...{ open, setOpen }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
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
                helperText={!!errors.phone && errors.phone.message}
                error={!!errors.phone}
                {...field}
              />
            )}
          />
        </form>
      </Popup>
      <ConfirmPhonePopup
        phone={onlyNumbers(watch('phone'))}
        open={confirmCodePopupOpen}
        setOpen={setConfirmCodePopupOpen}
      />
    </>
  );
}

export default React.memo(AuthPopup);
