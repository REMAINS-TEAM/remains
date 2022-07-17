import { SxProps } from '@mui/system';

export const menuWithHeaderContainer: SxProps = {
  display: 'flex',
  flex: 'none',
  width: '320px',
  height: 'calc(100% - 48px)',
  flexDirection: 'column',
  position: 'fixed',
};

export const header: SxProps = {
  py: 2,
  px: 1,
};

export const menuContainer: SxProps = {
  width: '320px',
  top: '6px',
  minHeight: 'calc(100% - 118px)',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  position: 'relative',
};

export const contentContainer: SxProps = {
  width: 'calc(100% - 360px)',
  left: '340px',
  position: 'relative',
};
