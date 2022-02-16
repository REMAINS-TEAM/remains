import { ListItemIcon, MenuItem as MUIMenuItem } from '@mui/material';
import React, { Component, ReactNode } from 'react';
import { SvgIconComponent } from '@mui/icons-material';

export default function MenuItem({
  Icon,
  label,
  onClick,
  color,
}: {
  onClick: () => void;
  Icon: SvgIconComponent;
  label: string;
  color?: string;
}) {
  return (
    <MUIMenuItem onClick={onClick} color={color}>
      <ListItemIcon>
        <Icon fontSize="small" />
      </ListItemIcon>
      {label}
    </MUIMenuItem>
  );
}
