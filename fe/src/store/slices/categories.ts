import { createSlice } from '@reduxjs/toolkit';
import categoriesApi from '../api/categories';

export interface Category {
  id: number;
  title: string;
  description?: string;
  sort: number;
  parentId: number;
  // items?: Item[];
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
  reducers: {
    setNew: (state) => {
      state.list.push({
        id: 1,
        title: 'test',
        sort: 1,
        parentId: 1,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      categoriesApi.endpoints.getCategoryById.matchFulfilled,
      (state, { payload }) => {
        state.current = payload;
      },
    );
    builder.addMatcher(
      categoriesApi.endpoints.getAllCategories.matchFulfilled,
      (state, { payload }) => {
        state.list = payload;
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const { setNew } = categoriesSlice.actions;

export default categoriesSlice.reducer;
