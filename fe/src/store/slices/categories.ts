import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import categoriesApi from '../api/categories';

export interface Category {
  id: number;
  title: string;
  description?: string;
  sort: number;
  parentId: number;
  parentCategory: Partial<Category>;
  _count: { subCategories: number; items: number };
}

const initialState: {
  current: Category | null;
  list: Category[];
} = {
  current: null,
  list: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      categoriesApi.endpoints.getAll.matchFulfilled,
      (state, { payload }) => {
        state.list = payload.list;
        state.current = payload.parentCategory;
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
