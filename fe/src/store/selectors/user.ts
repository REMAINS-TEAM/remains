import { RootState } from 'store/index';

export const getPaidStatus = (state: RootState) =>
  state.user &&
  new Date() < new Date(state.user.current?.paymentExpiredDate || 0);

export const getIsAdmin = (state: RootState) =>
  state.user && (state.user.current?.isAdmin || false);

export const getCurrentUser = (state: RootState) => state.user.current;
