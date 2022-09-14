import { ICategoryFilters } from 'store/api/categories';

export interface CategoryFiltersProps {
  categoryId: number;
  filterOptions: ICategoryFilters;
}

export interface FilterValues {
  brandIds: number[];
}
