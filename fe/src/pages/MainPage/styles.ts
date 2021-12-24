import { SxProps } from '@mui/system';

export const mainContainer: SxProps = {
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
  columnGap: 2,
};

export const header: SxProps = {
  fontSize: '1rem',
  py: 2,
  px: 1,
};

export const leftContainer: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: '250px',
  height: '100%',
};

export const menuContainer: SxProps = {
  width: '100%',
  height: '100%',
};

export const contentContainer: SxProps = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
};

export const itemsContainer: SxProps = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  rowGap: 1,
  paddingBottom: 4,
};
