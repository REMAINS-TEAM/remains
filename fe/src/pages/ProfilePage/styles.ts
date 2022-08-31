import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const contentContainer: SxProps = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
};

export const headerContainer: SxProps = {
  display: 'flex',
  columnGap: 2,
  my: 3,
};

export const accentedBtn: SxProps<Theme> = {
  '@keyframes blinker': {
    '0%': { opacity: 0 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
  animationName: 'blinker',
  animationDuration: '.8s',
  animationIterationCount: 'infinite',
};

export const tableValue = (theme: Theme) => ({
  [theme.breakpoints.down('sm')]: {
    maxWidth: 150,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});
