import {
  APP_FOOTER_HEIGHT,
  APP_FOOTER_MOBILE_HEIGHT,
  APP_HEADER_HEIGHT,
} from 'global/constants';
import { Theme } from '@mui/material';

export const contentContainer = (theme: Theme) => ({
  position: 'relative',
  top: APP_HEADER_HEIGHT,
  height: `calc(100vh  - ${APP_HEADER_HEIGHT}px - ${APP_FOOTER_HEIGHT}px)`,
  overflowY: 'auto',

  [theme.breakpoints.down('sm')]: {
    height: `calc(100vh  - ${APP_HEADER_HEIGHT}px - ${APP_FOOTER_MOBILE_HEIGHT}px)`,
  },
});
