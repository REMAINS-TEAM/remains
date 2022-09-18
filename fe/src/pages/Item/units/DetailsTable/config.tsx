import { Item } from 'store/slices/items';
import { ReactNode } from 'react';
import { Tooltip, Typography } from '@mui/material';

export interface InfoField {
  name: string;
  accessor: ((item: Item) => string | ReactNode) | keyof Item;
}

const BlurText = ({ text }: { text: string }) => (
  <Tooltip title="Для просмотра необходимо оплатить сервис">
    <Typography color="secondary" sx={{ filter: 'blur(5px)' }}>
      {text}
    </Typography>
  </Tooltip>
);

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
    name: 'Брэнд',
    accessor: (item) => item.brand?.title || 'Не указан',
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
    accessor: (item) =>
      item.user ? (
        item.user.name || 'Не указано'
      ) : (
        <BlurText text="Не доступно" />
      ),
  },
  {
    name: 'Телефон',
    accessor: (item) =>
      item.user ? (
        '+' + item.user?.phone || 'Не указан'
      ) : (
        <BlurText text="Не доступно" />
      ),
  },
  {
    name: 'E-mail',
    accessor: (item) =>
      item.user ? (
        item.user?.email || 'Не указан'
      ) : (
        <BlurText text="Не доступно" />
      ),
  },
  {
    name: 'Компания',
    accessor: (item) =>
      item.user ? (
        item.user?.company?.name || 'Не указана'
      ) : (
        <BlurText text="Не доступно" />
      ),
  },
  {
    name: 'Описание',
    accessor: (item) =>
      item.user ? (
        item.user?.company?.description || 'Не указано'
      ) : (
        <BlurText text="Не доступно" />
      ),
  },
];
