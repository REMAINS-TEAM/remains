import React, { useEffect, useState } from 'react';
import Popup from 'components/Popups/index';
import { Box, TextField, Typography } from '@mui/material';
import { PaymentPopupProps } from './types';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { paymentSchema } from './validation';
import YookassaCheckout from 'components/YookassaCheckout';
import userApi from 'store/api/user';

function PaymentPopup({ open, setOpen }: PaymentPopupProps) {
  const [createPaymentRequest, createPaymentResult] =
    userApi.useCreatePaymentMutation();

  const [widgetShow, setWidgetShow] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(paymentSchema),
    defaultValues: {
      amount: 500,
    },
  });

  const onSubmit = ({ amount }: { amount: number }) => {
    createPaymentRequest({ amount });
  };

  const resetForm = () => {
    reset();
    setWidgetShow(false);
  };

  useEffect(() => {
    if (!createPaymentResult?.data) return;
    setWidgetShow(true);
  }, [createPaymentResult]);

  return (
    <>
      <Popup
        title={`Оплатить сервис`}
        closeWhenSubmit={false}
        onOkClick={handleSubmit(onSubmit)}
        onClose={resetForm}
        hideActionButtons={widgetShow}
        {...{ open, setOpen }}
      >
        <Box sx={{ width: '400px' }}>
          {!widgetShow ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Введите сумму
              </Typography>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    margin="dense"
                    id="amount"
                    label="Сумма"
                    type="number"
                    fullWidth
                    variant="outlined"
                    helperText={
                      !!errors.amount &&
                      'Введите корректную сумму не меньше 500'
                    }
                    error={!!errors.amount}
                    {...field}
                  />
                )}
              />
            </form>
          ) : createPaymentResult?.data?.token ? (
            <YookassaCheckout token={createPaymentResult.data.token} />
          ) : (
            'Загрузка...'
          )}
        </Box>
      </Popup>
    </>
  );
}

export default React.memo(PaymentPopup);
