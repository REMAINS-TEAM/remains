import { Item } from 'store/slices/items';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export interface ItemEditPopupMenuProps {
  item: Item;
  sx?: SxProps<Theme>;
}
