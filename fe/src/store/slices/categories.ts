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
    setTree: (state, { payload }: PayloadAction<Category[]>) => {
      state.tree = payload;
    },
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
  },
});

// Action creators are generated for each case reducer function
export const { setTree } = categoriesSlice.actions;

export default categoriesSlice.reducer;
