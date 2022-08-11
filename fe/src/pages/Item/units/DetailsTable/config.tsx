import { Item } from 'store/slices/items';
import { ReactNode } from 'react';
import { Typography } from '@mui/material';

export interface InfoField {
  name: string;
  accessor: ((item: Item) => string | ReactNode) | keyof Item;
}

export const itemFields: InfoField[] = [
  {
    name: 'Название',
    accessor: 'title',
  },
  {
    name: 'Описание',
    accessor: 'description',
  },
  {
    name: 'Категория',
    accessor: (item) => item.category?.title || 'Не указана',
  },
  {
    name: 'Цена',
    accessor: (item) => (
      <Typography
        component="span"
        sx={{ fontWeight: 600, fontSize: 18 }}
      >{`${item.price.toLocaleString('ru')} ₽`}</Typography>
    ),
  },
];

export const userFields: InfoField[] = [
  {
    name: 'Имя',
    accessor: (item) => item.user.name || 'Не указано',
  },
  {
    name: 'Телефон',
    accessor: (item) => item.user.phone || 'Не указан',
  },
  {
    name: 'E-mail',
    accessor: (item) => item.user.email || 'Не указан',
  },
  {
    name: 'Компания',
    accessor: (item) => item.user.company?.name || 'Не указано',
  },
  {
    name: 'Описание',
    accessor: (item) => item.user.company?.description || 'Не указано',
  },
];
