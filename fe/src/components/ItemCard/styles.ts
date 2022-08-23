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
  py: 3,
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

export const rightSide: SxProps = {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  flexDirection: 'column',
  height: '100%',
  columnGap: 2,
  textAlign: 'right',
  pt: 1,

  '@media screen and (max-width: 600px)': {
    justifyContent: 'flex-end',
    pt: 0,
  },
};

export const dotsButton: SxProps = {
  position: 'absolute',
  right: '-4px',
  top: '-12px',
  p: 1,
};
