import { SxProps } from '@mui/system';
import { APP_HEADER_HEIGHT } from 'global/constants';

export const page: SxProps = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
};

export const container: SxProps = {
  width: '100%',
  height: `calc(100vh - ${APP_HEADER_HEIGHT}px)`,
  display: 'flex',
  columnGap: 2,
  rowGap: 2,
  '@media screen and (max-width: 800px)': {
    flexWrap: 'wrap',
  },
  p: 4,
  '&>*': {
    flex: '100%',
    height: '100%',
  },
};

export const title: SxProps = {
  display: 'flex',
  alignItems: 'center',
  columnGap: 2,
};
