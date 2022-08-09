import React, { ReactNode } from 'react';
import { ButtonProps, DialogProps } from '@mui/material';

export interface PopupProps extends DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  okButtonText?: string;
  cancelButtonText?: string;
  onOkClick?: (data?: any) => void;
  onClose?: () => void;
  closeWhenSubmit?: boolean;
  hideActionButtons?: boolean;
  children: ReactNode;
  okButtonProps?: ButtonProps;
}
