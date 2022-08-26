import React, { useEffect, useState } from 'react';
import Popup from 'components/Popups/index';
import { Box, TextField, Typography } from '@mui/material';
import { PaymentPopupProps } from './types';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { paymentSchema } from './validation';
import YookassaCheckout from 'components/YookassaCheckout';
import userApi from 'store/api/user';
import { MAX_PRICE, MIN_PRICE, MONTH_PRICE } from './constants';

function PaymentPopup({ open, setOpen }: PaymentPopupProps) {
  const [createPaymentRequest, createPaymentResult] =
    userApi.useCreatePaymentMutation();

  const [widgetShow, setWidgetShow] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: joiResolver(paymentSchema),
    defaultValues: {
      amount: MONTH_PRICE,
    },
  });

  const amountValue = watch('amount');
  const floatMothsCount = +amountValue / MONTH_PRICE;
  const monthsCount =
    floatMothsCount === Math.floor(floatMothsCount)
      ? floatMothsCount
      : floatMothsCount.toFixed(1);

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
        <Box maxWidth={500}>
          {!widgetShow ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="subtitle1" color="secondary" sx={{ mb: 2 }}>
                Введите сумму от {MIN_PRICE}₽ до {MAX_PRICE}₽
              </Typography>

              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    margin="dense"
                    id="amount"
                    label="Сумма, ₽"
                    type="number"
                    fullWidth
                    variant="outlined"
                    helperText={
                      !!errors.amount &&
                      `Введите корректную сумму от ${MIN_PRICE}₽ до ${MAX_PRICE}₽`
                    }
                    error={!!errors.amount}
                    {...field}
                  />
                )}
              />
              <Typography variant="subtitle2" color="secondary">
                1 месяц = {MONTH_PRICE}₽.{' '}
                {!errors.amount
                  ? `Введенной суммы хватит на ${monthsCount} мес.`
                  : ''}
              </Typography>
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
