import { SxProps } from '@mui/system';

export const root: SxProps = {
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  overflowY: 'auto',
};

export const center: SxProps = {
  position: 'relative',
  display: 'flex',
  px: 2,
  pt: 3,
  pb: 2,
  maxWidth: '1180px',
  width: '1180px',
  height: '100%',
  justifyContent: 'space-between',
  columnGap: 2,
};
