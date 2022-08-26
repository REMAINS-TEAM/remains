import { PopupProps } from 'components/Popups/types';
import { Category } from 'store/slices/categories';

export interface AddEditItemPopupProps
  extends Pick<PopupProps, 'open' | 'setOpen'> {
  category?: Category | null;
  itemId?: number;
}
