import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Company {
  id: number;
  name: string;
  description: string;
}

export interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  paymentExpiredDate: Date;
  company: Company;
}

const initialState: User = {} as User;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<User>) => {
      state = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrent } = userSlice.actions;

export default userSlice.reducer;
