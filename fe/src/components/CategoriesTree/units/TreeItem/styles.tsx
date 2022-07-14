import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const itemContainer: any = {
  display: 'flex',
  justifyContent: 'space-between',
  pt: 1,
  cursor: 'pointer',
  color: (theme: Theme) => theme.palette.grey[800],
};

export const titleContainer: SxProps = {
  display: 'flex',
  columnGap: 2,
  alignItems: 'center',
};
