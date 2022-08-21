import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Popups {
  auth: boolean;
  payment: boolean;
}

const initialState: Popups = {
  auth: false,
  payment: false,
};

export const popupsSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    setShowPopup: (
      state,
      action: PayloadAction<{ name: keyof Popups; isShow?: boolean }>,
    ) => {
      state = {
        ...state,
        [action.payload.name]: action.payload.isShow ?? true,
      };
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShowPopup } = popupsSlice.actions;

export default popupsSlice.reducer;
