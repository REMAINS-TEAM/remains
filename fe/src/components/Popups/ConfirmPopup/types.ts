import { PopupProps } from 'components/Popups/types';

export interface ConfirmPopupProps<T>
  extends Pick<PopupProps, 'open' | 'setOpen' | 'onOkClick'> {
  title?: string;
  text?: string;
  data?: T;
}
