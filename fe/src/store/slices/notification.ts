import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material';

export interface Notification {
  text: string;
  type: AlertColor;
  open?: boolean;
}

const initialState: Notification = {
  text: '',
  type: 'info',
  open: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<Notification>) => {
      state = { ...action.payload, open: true };
      return state;
    },
    hide: (state) => {
      state = { ...initialState, open: false };
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { show, hide } = notificationSlice.actions;

export default notificationSlice.reducer;
