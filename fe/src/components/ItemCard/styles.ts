import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const itemContainer: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  display: 'flex',
  minHeight: '200px',
  height: '200px',
  columnGap: 1,
  justifyContent: 'space-between',
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
  paddingRight: 2,
  overflow: 'hidden',
};

export const rightSide: SxProps = {
  minWidth: '150px',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  flexDirection: 'column',
  height: '100%',
  columnGap: 2,
};

export const rightTop: SxProps = {
  display: 'flex',
  alignItems: 'flex-end',
  rowGap: 3.5,
  flexDirection: 'column',
};

export const rightBottom: SxProps = {
  display: 'flex',
  alignItems: 'flex-end',
  rowGap: 1,
};

export const dotsButton: SxProps = {
  position: 'absolute',
  right: '4px',
  top: '-10px',
  p: 1,
};
