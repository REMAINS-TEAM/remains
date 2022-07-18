import { ListItemIcon, MenuItem as MUIMenuItem } from '@mui/material';
import React, { useState } from 'react';
import { SvgIconComponent } from '@mui/icons-material';
import ConfirmPopup from 'components/Popups/ConfirmPopup';

export default function MenuItem({
  Icon,
  label,
  onClick,
  color,
  confirm,
}: {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  Icon: SvgIconComponent;
  label: string;
  color?: string;
  confirm?: boolean;
}) {
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);

  const showConfirmPopup = () => setConfirmPopupOpen(true);

  return (
    <>
      <MUIMenuItem
        onClick={confirm ? showConfirmPopup : onClick}
        sx={{ color }}
      >
        <ListItemIcon sx={{ color }}>
          <Icon fontSize="small" />
        </ListItemIcon>
        {label}
      </MUIMenuItem>

      <ConfirmPopup
        open={confirmPopupOpen}
        setOpen={setConfirmPopupOpen}
        onOkClick={onClick}
      />
    </>
  );
}
