import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const itemContainer: any = {
  display: 'flex',
  justifyContent: 'space-between',
  pt: 1,
  cursor: 'pointer',
  fontSize: 14,
  color: (theme: Theme) => theme.palette.grey[600],
  '&:hover': {
    opacity: 0.8,
  },
};

export const titleContainer: SxProps = {
  display: 'flex',
  columnGap: 2,
  alignItems: 'center',
};
