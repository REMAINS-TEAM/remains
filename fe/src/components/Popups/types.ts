import { ReactNode } from 'react';

export interface PopupProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  okButtonText?: string;
  cancelButtonText?: string;
  onOkClick?: () => void;
  hideActionButtons?: boolean;
  children: ReactNode;
}
