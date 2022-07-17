import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Menu {
  open: boolean;
}

const initialState: Menu = {
  open: true,
};
export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpen } = menuSlice.actions;

export default menuSlice.reducer;
