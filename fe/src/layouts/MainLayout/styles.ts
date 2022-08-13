import { SxProps } from '@mui/system';

export const root: SxProps = {
  display: 'flex',
  width: '100%',
  height: 'calc(100vh - 64px - 16px)',
  justifyContent: 'center',
};

export const center: SxProps = {
  position: 'relative',
  display: 'flex',
  px: 2,
  pt: 1,
  pb: 2,
  maxWidth: '1180px',
  width: '1180px',
  height: '100%',
  justifyContent: 'space-between',
  columnGap: 2,
};
