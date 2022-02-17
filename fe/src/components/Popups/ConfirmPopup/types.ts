import { PopupProps } from 'components/Popups/types';

export interface ConfirmPopupProps
  extends Pick<PopupProps, 'open' | 'setOpen' | 'onOkClick'> {}
