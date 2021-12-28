import { SxProps } from '@mui/system';

export const root = {
  display: 'flex',
  width: '100%',
  height: 'calc(100vh - 64px - 16px)',
  justifyContent: 'center',
};

export const center = {
  position: 'relative',
  display: 'flex',
  padding: 2,
  maxWidth: '1180px',
  width: '1180px',
  height: '100%',
  justifyContent: 'space-between',
  columnGap: 2,
} as SxProps;
