import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { PopupProps } from './types';

export default function Popup({
  open,
  setOpen,
  title = '',
  okButtonText = 'OK',
  cancelButtonText = 'Отмена',
  onOkClick,
  closeWhenSubmit = true,
  hideActionButtons = false,
  children,
  sx,
}: PopupProps) {
  const handleOkClick = () => {
    closeWhenSubmit && setOpen(false);
    onOkClick && onOkClick();
  };

  const handleCancelClick = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleCancelClick} scroll={'paper'} sx={sx}>
      {title && <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>}
      <DialogContent dividers={true}>{children}</DialogContent>
      {!hideActionButtons && (
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCancelClick}>{cancelButtonText}</Button>
          <Button variant={'contained'} onClick={handleOkClick}>
            {okButtonText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
