import { Category } from 'store/slices/categories';

export interface CategoriesTreeProps {
  onSelect?: (tree: Category[]) => void;
}
