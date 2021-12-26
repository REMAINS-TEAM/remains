import { SxProps } from '@mui/system';

export const header: SxProps = {
  fontSize: '1rem',
  py: 2,
  px: 1,
};

export const contentContainer: SxProps = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
};

export const itemsContainer: SxProps = {
  position: 'relative',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  rowGap: 1,
  paddingBottom: 4,
};
