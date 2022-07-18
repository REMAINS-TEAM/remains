import React, { ReactNode } from 'react';
import { DialogProps } from '@mui/material';

export interface PopupProps extends DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  okButtonText?: string;
  cancelButtonText?: string;
  onOkClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onClose?: () => void;
  closeWhenSubmit?: boolean;
  hideActionButtons?: boolean;
  children: ReactNode;
}
