import { SxProps } from '@mui/system';

export const popup: SxProps = {
  maxWidth: '2000px !important',
};

export const generalContainer: SxProps = {
  display: 'flex',
  width: '100%',
  flexWrap: 'wrap',
  columnGap: 2,
  rowGap: 3,
};

export const dataContainer: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: '450px',

  '@media screen and (max-width: 1050px)': {
    width: '100%',
  },
};
