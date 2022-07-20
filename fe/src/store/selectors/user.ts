import { RootState } from 'store/index';

export const getPaidStatus = (state: RootState) =>
  state.user &&
  new Date() < new Date(state.user.current?.paymentExpiredDate || 0);

export const getCurrentUser = (state: RootState) => state.user.current;
