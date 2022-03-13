import { Item } from 'store/slices/items';

export const fields: {
  name: string;
  accessor: keyof Item;
}[] = [
  {
    name: 'Название',
    accessor: 'title',
  },
  {
    name: 'Описание',
    accessor: 'description',
  },
  {
    name: 'Цена',
    accessor: 'price', // TODO: добавить возможность писать ф-ию
  },
];
