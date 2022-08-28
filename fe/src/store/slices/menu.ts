import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Menu {
  open: boolean;
  showBurger: boolean;
}

const initialState: Menu = {
  open: true,
  showBurger: false,
};
export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setShowBurger: (state, action: PayloadAction<boolean>) => {
      state.showBurger = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpen, setShowBurger } = menuSlice.actions;

export default menuSlice.reducer;
