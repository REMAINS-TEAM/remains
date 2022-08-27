import { Menu } from '@mui/material';
import React, { ReactNode, useMemo } from 'react';
import * as styles from './styles';

export default function PopupMenu({
  id,
  anchorEl,
  setAnchorEl,
  children,
}: {
  id: string;
  anchorEl: HTMLElement | null;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  children: ReactNode;
}) {
  const open = Boolean(anchorEl);

  const handleClose = (e: any) => {
    setAnchorEl(null);
  };

  const keepMounted = useMemo(
    () =>
      Array.isArray(children) && children.some((child) => child.props.confirm),
    [children],
  );

  return (
    <Menu
      anchorEl={anchorEl}
      id={id}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: styles.paper,
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      keepMounted={keepMounted}
    >
      {children}
    </Menu>
  );
}
