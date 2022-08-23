import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const page: SxProps = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
};

export const paper = (theme: Theme) => ({
  p: 4,
  height: '90%',
  overflowY: 'auto',

  [theme.breakpoints.down('sm')]: {
    px: 0,
    py: 3,
  },
});
