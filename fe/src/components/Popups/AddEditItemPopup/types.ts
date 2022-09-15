import { PopupProps } from 'components/Popups/types';
import { Category } from 'store/slices/categories';
import { Item } from 'store/slices/items';

export interface AddEditItemPopupProps
  extends Pick<PopupProps, 'open' | 'setOpen'> {
  category?: Category | null;
  itemId?: number;
  onAdd?: (item: Item) => void;
  onEdit?: (item: Item) => void;
}
