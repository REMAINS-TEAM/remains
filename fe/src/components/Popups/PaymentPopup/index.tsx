import React, { useEffect, useRef, useState } from 'react';
import Popup from 'components/Popups/index';
import { Button, TextField, Typography } from '@mui/material';
import { PaymentPopupProps } from './types';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { paymentSchema } from './validation';

function PaymentPopup({ open, setOpen }: PaymentPopupProps) {
  const paymentFormRef = useRef<HTMLDivElement | null>(null);
  const [checkout, setCheckout] = useState<any>(null);

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

  // TODO: выделить в отдельный компонент
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://yookassa.ru/checkout-widget/v1/checkout-widget.js';
    document.head.append(script);

    /*
     * confirmation_token получается после запроса на https://api.yookassa.ru/v3/payments
     * подробнее https://yookassa.ru/developers/payment-acceptance/integration-scenarios/widget/quick-start#process
     * */
    script.onload = function () {
      //@ts-ignore
      const yooCheckout = new window.YooMoneyCheckoutWidget({
        confirmation_token: 'ct-2a8df14d-000f-5000-9000-14aeb8cb13cf',
        return_url: 'http://localhost:3000',

        customization: {
          colors: {
            control_primary: '#00BF96',
            background: '#F2F3F5',
          },
        },
        error_callback: function (error: any) {
          console.log(error);
        },
      });

      setCheckout(yooCheckout);
    };
  }, []);

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
        <Button onClick={() => checkout.render('payment-form')}>
          Показать форму оплаты
        </Button>
        <div id="payment-form" ref={paymentFormRef} />
      </Popup>
    </>
  );
}

export default React.memo(PaymentPopup);
