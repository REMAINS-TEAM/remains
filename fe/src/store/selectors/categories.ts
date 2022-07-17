import { RootState } from 'store/index';
import categoriesApi from 'store/api/categories';

export const getCurrentCategory = (state: RootState) =>
  state.categories.current;

export const getCategoriesTree = (state: any) =>
  categoriesApi.endpoints.getAllCategories.select()(state);
