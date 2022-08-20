import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const itemContainer: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexGrow: 1,
  minHeight: '200px',
  height: 'fit-content',
  overflow: 'hidden',
  px: 2,
  py: 4,
  cursor: 'pointer',
  transition: 'box-shadow .3s',
  '&:hover': {
    boxShadow: (theme: Theme) => `0 0 10px ${theme.palette.grey[200]}`,
    '& button[aria-controls=details]': {
      backgroundColor: (theme: Theme) => theme.palette.primary.main,
      color: (theme: Theme) => theme.palette.primary.contrastText,
    },
    '& h3': {
      color: (theme: Theme) => theme.palette.primary.dark,
    },
  },
  '&:active': {
    transform: 'scale(0.996)',
  },
};

export const leftSide: SxProps = {
  display: 'flex',
  height: '100%',
  columnGap: 2,
  paddingRight: 1,
  overflow: 'hidden',
};

export const rightSide: SxProps = {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  flexDirection: 'column',
  height: '100%',
  columnGap: 2,
  textAlign: 'right',

  '@media screen and (max-width: 600px)': {
    justifyContent: 'flex-end',
  },
};

export const rightTop: SxProps = {
  display: 'flex',
  alignItems: 'flex-end',
  rowGap: 3.5,
  flexDirection: 'column',
};

export const dotsButton: SxProps = {
  position: 'absolute',
  right: '-2px',
  top: '-10px',
  p: 1,
};
