import { createSlice } from '@reduxjs/toolkit';
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
  tree: Category[];
} = {
  current: null,
  list: [],
  tree: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setNew: (state) => state,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      categoriesApi.endpoints.getAllCategories.matchFulfilled,
      (state, { payload }) => {
        state.list = payload.list;
        state.current = payload.parentCategory;
        state.tree = payload.tree;
      },
    );
    builder.addMatcher(
      categoriesApi.endpoints.getAllCategories.matchRejected,
      (state, { payload }) => {
        console.log('matcher', payload);
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const { setNew } = categoriesSlice.actions;

export default categoriesSlice.reducer;
