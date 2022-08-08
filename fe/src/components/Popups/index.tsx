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
  onClose,
  closeWhenSubmit = true,
  hideActionButtons = false,
  okButtonProps,
  children,
  ...rest
}: PopupProps) {
  const handleOkClick = (event: React.MouseEvent<HTMLElement>) => {
    if (closeWhenSubmit) {
      setOpen(false);
      if (onClose) onClose();
    }
    onOkClick && onOkClick(event);
  };

  const handleCancelClick = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancelClick} scroll={'paper'} {...rest}>
      {title && <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>}
      <DialogContent dividers={true}>{children}</DialogContent>
      {!hideActionButtons && (
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCancelClick}>{cancelButtonText}</Button>
          <Button
            variant={'contained'}
            onClick={handleOkClick}
            {...okButtonProps}
          >
            {okButtonText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
