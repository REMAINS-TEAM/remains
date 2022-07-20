import React from 'react';
import { ItemsGroupProps, ItemType } from './types';
import { ListItemIcon, MenuItem } from '@mui/material';
import * as styles from './styles';
import { useNavigate } from 'react-router-dom';

const ItemsGroup = ({ title, icon, items, type }: ItemsGroupProps) => {
  const navigate = useNavigate();

  const itemClickHandler = (type: ItemType, id: number) => () =>
    navigate(`/${type}/${id}`);

  return (
    <>
      <MenuItem disabled sx={styles.menuItemHeader}>
        <ListItemIcon>{icon}</ListItemIcon>
        {`${title} (${items?.length || 0})`}
      </MenuItem>

      {items?.length ? (
        items.map((item) => (
          <MenuItem
            key={item.id}
            sx={styles.menuItem}
            onClick={itemClickHandler(type, item.id)}
          >
            {(item as { title: string }).title ||
              (item as { name: string }).name}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled sx={styles.menuItem}>
          Тут ничего не нашлось
        </MenuItem>
      )}
    </>
  );
};

export default ItemsGroup;
