import React, { useEffect, useState } from 'react';
import { REDIRECT_URL, SCRIPT_URL } from './constants';
import { useTheme } from '@mui/material';

const YookassaCheckout = ({
  token,
  onError,
}: {
  token: string;
  onError?: (error: any) => void;
}) => {
  const theme = useTheme();

  const [checkout, setCheckout] = useState<{
    render: (id: string) => void;
  } | null>(null);

  useEffect(() => {
    if (!token || !theme) return;

    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    document.head.append(script);

    /*
     * confirmation_token получается после запроса на https://api.yookassa.ru/v3/payments
     * подробнее https://yookassa.ru/developers/payment-acceptance/integration-scenarios/widget/quick-start#process
     * Тест карта: 5555 5555 5555 4477 01/30
     *  */
    script.onload = function () {
      //@ts-ignore
      const yooCheckout = new window.YooMoneyCheckoutWidget({
        confirmation_token: token,
        return_url: REDIRECT_URL,
        customization: {
          colors: {
            control_primary: theme.palette.primary.main,
            background: theme.palette.background.paper,
          },
        },
        error_callback: onError ? onError : () => null,
      });

      setCheckout(yooCheckout);
    };
  }, [token, theme, onError]);

  useEffect(() => {
    if (!checkout) return;
    checkout.render('payment-form');
  }, [checkout]);

  return <div id="payment-form" />;
};

export default YookassaCheckout;
