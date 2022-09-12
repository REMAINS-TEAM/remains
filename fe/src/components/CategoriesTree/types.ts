import { Category } from 'store/slices/categories';

export interface CategoriesTreeProps {
  onSelect?: (categoryId: number) => void;
  data?: {
    list: Category[];
    parentCategory: Category | null;
    tree: Category[];
  };
  isFetching?: boolean;
}
