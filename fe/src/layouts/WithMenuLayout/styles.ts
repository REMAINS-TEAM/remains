import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';
import { APP_FOOTER_HEIGHT, APP_HEADER_HEIGHT } from 'global/constants';

export const menuWithHeaderContainer = (theme: Theme) => ({
  display: 'flex',
  flex: 'none',
  width: '280px',
  height: `calc(100vh - ${APP_HEADER_HEIGHT}px - ${APP_FOOTER_HEIGHT}px - 48px)`,
  overflowY: 'auto',
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

export const contentContainer = (theme: Theme) => ({
  width: 'calc(100% - 310px)',
  left: '310px',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    position: 'static',
  },
});
