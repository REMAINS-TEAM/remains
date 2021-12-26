import { createSlice } from '@reduxjs/toolkit';
import categoriesApi from '../api/categories';

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
  reducers: {},
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     categoriesApi.endpoints.getCategoryById.matchFulfilled,
  //     (state, { payload }) => {
  //       state.current = payload;
  //     },
  //   );
  //   builder.addMatcher(
  //     categoriesApi.endpoints.getAllCategories.matchFulfilled,
  //     (state, { payload }) => {
  //       state.list = payload;
  //     },
  //   );
  // },
});

// Action creators are generated for each case reducer function
export const {} = itemsSlice.actions;

export default itemsSlice.reducer;
