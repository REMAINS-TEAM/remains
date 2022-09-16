import { ICategoryFilters } from 'store/api/categories';

export interface CategoryFiltersProps {
  filterOptions: ICategoryFilters;
}

export interface FilterValues {
  brandIds: number[];
}
