import React from 'react';
import Popup from 'components/Popups/index';
import { TextField, Typography } from '@mui/material';
import { ConfirmPhonePopupProps } from './types';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { confirmCodeSchema } from 'components/Popups/ConfirmPhonePopup/validation';

function ConfirmPhonePopup({ open, setOpen }: ConfirmPhonePopupProps) {
  // useResponseNotifications({
  //   result,
  //   onSuccess: () => setOpen(false),
  //   onSuccessText: 'Успешно!',
  //   onErrorText: 'Неверный код',
  // });

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
    // ...
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
          Сейчас Вам поступит звонок. Не принимайте его. Просто введите
          последние 4 цифры номера.
        </Typography>

        <form>
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
