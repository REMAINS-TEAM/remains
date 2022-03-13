import { RootState } from 'store/index';

export const getPaymentNotExpiredStatus = (state: RootState) =>
  state.user && new Date() < new Date(state.user.paymentExpiredDate);
