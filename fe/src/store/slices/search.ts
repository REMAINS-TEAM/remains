import { Category } from 'store/slices/categories';
import { Item } from 'store/slices/items';
import { Company } from 'store/slices/user';

export interface Search {
  categories: Category[];
  items: Item[];
  companies: Company[];
}
