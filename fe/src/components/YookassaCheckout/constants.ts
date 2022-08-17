import routes from 'routes';

export const SCRIPT_URL =
  'https://yookassa.ru/checkout-widget/v1/checkout-widget.js';
export const REDIRECT_URL = `${window.location.protocol}//${window.location.host}${routes.payment.success}`;
