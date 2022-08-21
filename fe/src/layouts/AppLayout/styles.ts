import { SxProps } from '@mui/system';
import {
  APP_FOOTER_HEIGHT,
  APP_HEADER_HEIGHT,
  VIEWPORT_HEIGHT,
} from 'global/constants';

export const contentContainer: SxProps = {
  position: 'relative',
  top: APP_HEADER_HEIGHT,
  height: `calc(${VIEWPORT_HEIGHT} - ${APP_HEADER_HEIGHT}px - ${APP_FOOTER_HEIGHT}px)`,
  overflowY: 'auto',
};
