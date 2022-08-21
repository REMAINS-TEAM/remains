import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const container: SxProps<Theme> = {
  px: 4,
  py: 2,
  fontSize: 12,
  color: (theme: Theme) => theme.palette.secondary.main,
  overflow: 'hidden',

  '@media screen and (max-width: 600px)': {
    justifyContent: 'flex-end',
    px: 2,
    py: 1,
  },
};
