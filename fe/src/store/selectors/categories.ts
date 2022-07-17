import { RootState } from 'store/index';

export const getCurrentCategory = (state: RootState) =>
  state.categories.current;

export const getCategoriesTree = (state: RootState) => state.categories.tree;
