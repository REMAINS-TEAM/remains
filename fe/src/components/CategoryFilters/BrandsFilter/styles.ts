import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const container = {
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'background.paper',
  borderRadius: 1,
  color: (theme: Theme) => theme.palette.grey[700],
};

export const header: SxProps<Theme> = {
  p: 2,
  pl: 2.5,
  display: 'flex',
  alignItems: 'center',
  columnGap: 2,
};

export const list: SxProps<Theme> = {
  maxHeight: 300,
  overflowY: 'auto',
};
