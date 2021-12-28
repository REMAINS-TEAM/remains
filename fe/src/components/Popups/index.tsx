import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PopupProps } from './types';

export default function Popup({
  open,
  setOpen,
  title = '',
  okButtonText = 'OK',
  cancelButtonText = 'Отмена',
  onOkClick,
  hideActionButtons = false,
  children,
}: PopupProps) {
  const handleOkClick = () => {
    setOpen(false);
    onOkClick && onOkClick();
  };

  const handleCancelClick = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleCancelClick} scroll={'paper'}>
        {title && <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>}
        <DialogContent dividers={true}>{children}</DialogContent>
        {!hideActionButtons && (
          <DialogActions>
            <Button onClick={handleCancelClick}>{cancelButtonText}</Button>
            <Button onClick={handleOkClick}>{okButtonText}</Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
