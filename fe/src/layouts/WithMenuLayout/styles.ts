import { SxProps } from '@mui/system';

export const menuWithHeaderContainer: SxProps = {
  display: 'flex',
  flex: 'none',
  width: '320px',
  height: '100%',
  flexDirection: 'column',
  position: 'relative',
};

export const header: SxProps = {
  fontSize: '1rem',
  py: 2,
  px: 1,
};

export const menuContainer: SxProps = {
  width: '320px',
  minHeight: 'calc(100% - 48px)',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
};
