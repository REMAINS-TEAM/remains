import React from 'react';
import Popup from 'components/Popups/index';
import { TextField, Typography } from '@mui/material';
import { ConfirmPhonePopupProps } from './types';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { confirmCodeSchema } from 'components/Popups/ConfirmPhonePopup/validation';
import usersApi from 'store/api/user';
import useResponseNotifications from 'hooks/useResponseNotifications';
import { useDispatch } from 'react-redux';
import { setGeneralVariables } from 'store/slices/general';
import { LS_KEY_TOKEN } from 'global/constants';

function ConfirmPhonePopup({ open, setOpen, phone }: ConfirmPhonePopupProps) {
  const dispatch = useDispatch();

  const [confirmCodeRequest, result] = usersApi.useConfirmCodeMutation();
  useResponseNotifications({
    result,
    onSuccess: ({ token }) => {
      dispatch(setGeneralVariables({ [LS_KEY_TOKEN]: token }));
      setOpen(false);
    },
    onSuccessText: 'Успешно!',
    onErrorText: 'Неверный код или телефон',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(confirmCodeSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = ({ code }: { code: string }) => {
    confirmCodeRequest({ phone, code: +code });
  };

  return (
    <>
      <Popup
        title={`Подтверждение номера`}
        closeWhenSubmit={false}
        onOkClick={handleSubmit(onSubmit)}
        {...{ open, setOpen }}
      >
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Сейчас Вам поступит звонок. Прослушайте сообщение и введите
          произнесенный код для входа.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="code"
                label="Код"
                type="number"
                fullWidth
                variant="outlined"
                inputProps={{ pattern: '[0-9]*' }}
                helperText={!!errors.code && 'Код должен состоять из 4 цифр'}
                error={!!errors.code}
                {...field}
              />
            )}
          />
        </form>
      </Popup>
    </>
  );
}

export default React.memo(ConfirmPhonePopup);
