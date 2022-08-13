import React from 'react';
import Popup from 'components/Popups/index';
import { TextField, Typography } from '@mui/material';
import { PaymentPopupProps } from './types';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { paymentSchema } from './validation';

function PaymentPopup({ open, setOpen }: PaymentPopupProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(paymentSchema),
    defaultValues: {
      sum: 500,
    },
  });

  const onSubmit = ({ sum }: { sum: string }) => {
    console.log(sum);
  };

  return (
    <>
      <Popup
        title={`Оплатить сервис`}
        closeWhenSubmit={false}
        onOkClick={handleSubmit(onSubmit)}
        {...{ open, setOpen }}
      >
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Введите сумму
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="sum"
            control={control}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="sum"
                label="Сумма"
                type="number"
                fullWidth
                variant="outlined"
                helperText={!!errors.sum && 'Введите корректную сумму'}
                error={!!errors.sum}
                {...field}
              />
            )}
          />
        </form>
      </Popup>
    </>
  );
}

export default React.memo(PaymentPopup);
