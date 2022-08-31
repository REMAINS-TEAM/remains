import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Company {
  id: number;
  name: string;
  description: string;
  createdAt?: string;
}

export interface User {
  id: number;
  name: string | null;
  phone: string;
  email: string | null;
  paymentExpiredDate: Date;
  company: Company | null;
  isAdmin: boolean;
}

const initialState: { current: User | null } = {
  current: null,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<User | null>) => {
      state.current = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrent } = userSlice.actions;

export default userSlice.reducer;
