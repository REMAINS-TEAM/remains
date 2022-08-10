import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const menuWithHeaderContainer = (theme: Theme) => ({
  display: 'flex',
  flex: 'none',
  width: '320px',
  height: 'calc(100% - 48px)',
  flexDirection: 'column',
  position: 'fixed',
  zIndex: 1000,
  [theme.breakpoints.down('md')]: {
    top: '100px',
    width: 'calc(100% - 32px)',
  },
});

export const header: SxProps = {
  display: 'flex',
  alignItems: 'center',
  py: 3,
  pl: 1,
};

export const menuContainer: SxProps = {
  width: '100%',
  top: '6px',
  minHeight: 'calc(100% - 118px)',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  position: 'relative',
};

export const contentContainer = (theme: Theme) => ({
  width: 'calc(100% - 360px)',
  left: '340px',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    position: 'static',
  },
});
