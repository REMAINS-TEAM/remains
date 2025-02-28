import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const container = {
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: '0 1px 2px #ccc',
  color: (theme: Theme) => theme.palette.grey[700],
};

export const header: SxProps<Theme> = {
  p: 1,
  pl: 2.5,
  display: 'flex',
  alignItems: 'center',
  columnGap: 1,
};

export const list: SxProps<Theme> = {
  maxHeight: 300,
  overflowY: 'auto',
};
