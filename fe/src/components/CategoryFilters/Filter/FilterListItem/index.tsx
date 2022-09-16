import React from 'react';
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import * as styles from './styles';

const FilterListItem = ({
  id,
  title,
  onChange,
  checked,
}: {
  id: number;
  title: string;
  onChange: (id: number) => void;
  checked?: boolean;
}) => {
  return (
    <ListItem key={id} disablePadding>
      <ListItemButton onClick={() => onChange(id)} sx={{ p: 0.2, pl: 5.6 }}>
        <ListItemIcon sx={{ minWidth: 18 }}>
          <Checkbox
            sx={{ p: 0 }}
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText
          id={`brand-${id}`}
          sx={{ pr: 2, pl: 1 }}
          primaryTypographyProps={{ sx: styles.itemText }}
          primary={title}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default FilterListItem;
