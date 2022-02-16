import { ListItemIcon, MenuItem as MUIMenuItem } from '@mui/material';
import React from 'react';

export default function MenuItem({
  Icon,
  label,
  onClick,
  color,
}: {
  onClick: () => void;
  Icon: any;
  label: string;
  color?: string;
}) {
  return (
    <MUIMenuItem onClick={onClick} color={color}>
      <ListItemIcon>
        <Icon fontSize="small" color={color} />
      </ListItemIcon>
      {label}
    </MUIMenuItem>
  );
}
