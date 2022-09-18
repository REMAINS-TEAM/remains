import { ICategoryFilters } from 'store/api/categories';

export interface CategoryFiltersProps {
  filterOptions: ICategoryFilters;
}

export const filterNames: Record<string, keyof FilterValues> = {
  BRAND_IDS: 'brandIds',
};

export type FilterName = typeof filterNames[keyof typeof filterNames];

export interface FilterValues {
  brandIds?: number[];
}
