import { Theme } from '@mui/material';

export const menuItemHeader = {
  fontSize: 14,
  opacity: '1 !important',
  fontWeight: 600,
  color: (theme: Theme) => theme.palette.grey[700],
  '& svg': {
    fontSize: 20,
    color: (theme: Theme) => theme.palette.grey[700],
  },
};

export const menuItem = {
  pl: '52px',
  fontSize: 14,
  color: (theme: Theme) => theme.palette.grey[700],
};
