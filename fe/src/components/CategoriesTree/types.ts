import { Category } from '../../store/slices/categories';

export interface CategoriesTreeType {
  initCategories: Category[] | undefined;
  isLoading: boolean;
}
