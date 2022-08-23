import { SxProps } from '@mui/system';
import {
  APP_FOOTER_HEIGHT,
  APP_FOOTER_MOBILE_HEIGHT,
  APP_HEADER_HEIGHT,
} from 'global/constants';
import { Theme } from '@mui/material';

export const carousel: SxProps = {
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
};

export const imageContainer = (theme: Theme) => ({
  height: `calc(100vh - ${APP_HEADER_HEIGHT}px - ${APP_FOOTER_HEIGHT}px - 200px)`,
  overflow: 'hidden',

  [theme.breakpoints.down('sm')]: {
    height: `calc(100vh  - ${APP_HEADER_HEIGHT}px - ${APP_FOOTER_MOBILE_HEIGHT}px - 200px)`,
  },
});
