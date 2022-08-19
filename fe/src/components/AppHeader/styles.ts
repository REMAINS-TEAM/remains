import { SxProps } from '@mui/system';

export const toolbar: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
};

export const leftSide: SxProps = {
  display: 'flex',
  columnGap: 1,
  alignItems: 'center',
};

export const rightSide: SxProps = {
  display: 'flex',
  columnGap: 2,
  alignItems: 'center',

  '@media screen and (max-width: 500px)': {
    columnGap: 0,
  },
};
