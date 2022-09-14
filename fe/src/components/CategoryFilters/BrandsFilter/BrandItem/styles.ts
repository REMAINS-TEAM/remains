import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const itemText: SxProps<Theme> = {
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: 14,
  color: (theme: Theme) => theme.palette.grey[600],
};
