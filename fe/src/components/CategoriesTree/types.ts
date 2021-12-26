import { Category } from 'store/slices/categories';

export interface CategoriesTreeProps {
  initCategories: Category[] | undefined;
  isLoading: boolean;
  onSelect?: (id: number) => void;
}
