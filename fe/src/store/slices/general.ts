import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface General {
  [name: string]: string | null;
}

const initialState: General = {};

// use when we have to follow changes of local storage
export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setGeneralVariables: (state, action: PayloadAction<General>) => {
      Object.entries(action.payload).forEach(([key, value]) =>
        localStorage.setItem(key, value || ''),
      );

      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGeneralVariables } = generalSlice.actions;

export default generalSlice.reducer;
