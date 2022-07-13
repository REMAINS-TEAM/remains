import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import categoriesApi from '../api/categories';
import { Notification } from 'store/slices/notification';
import itemsApi from 'store/api/items';

export interface Item {
  id: number;
  title: string;
  description?: string;
  userId: number;
  images: string[];
  price: number;
  categoryId: number;
  countSubCategories?: number;
  itemsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const initialState: {
  current: Item | null;
  list: Item[];
} = {
  current: null,
  list: [],
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    deleteById: (state, action: PayloadAction<number>) => {
      state = {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload),
      };
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      itemsApi.endpoints.getItems.matchFulfilled,
      (state, { payload }) => {
        state.list = payload;
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const { deleteById } = itemsSlice.actions;

export default itemsSlice.reducer;
