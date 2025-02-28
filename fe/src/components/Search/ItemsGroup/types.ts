import { Category } from 'store/slices/categories';
import { Item } from 'store/slices/items';
import { Company } from 'store/slices/user';

export interface ItemsGroupProps {
  title: string;
  icon: JSX.Element;
  items?: (Category | Item | Company)[];
  type: ItemType;
}

export enum ItemType {
  CATEGORIES = 'categories',
  ITEMS = 'items',
  COMPANIES = 'companies',
}
