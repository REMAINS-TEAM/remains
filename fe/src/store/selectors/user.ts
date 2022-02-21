import { RootState } from 'store/index';

export const getPaymentExpiredStatus = (state: RootState) =>
  state.user && new Date() > new Date(state.user.paymentExpiredDate);
