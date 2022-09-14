import React from 'react';
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import * as styles from './styles';

const BrandItem = ({
  id,
  title,
  onChange,
  checked,
}: {
  id?: number;
  title: string;
  onChange?: () => void;
  checked?: boolean;
}) => {
  return (
    <ListItem key={id || 0} disablePadding>
      <ListItemButton onClick={() => null} sx={{ p: 0.4, pl: 4 }}>
        <ListItemIcon sx={{ minWidth: 20 }}>
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

export default BrandItem;
