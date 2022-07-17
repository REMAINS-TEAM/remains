import { RootState } from 'store/index';

export const getCurrentCategory = (state: RootState) =>
  state.categories.tree.length
    ? state.categories.tree[state.categories.tree.length - 1]
    : null;

export const getCategoriesTree = (state: RootState) => state.categories.tree;
