import { SxProps } from '@mui/system';
import { APP_HEADER_HEIGHT } from 'global/constants';

export const page: SxProps = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
};

export const container: SxProps = {
  width: '100%',
  height: `calc(100vh - ${APP_HEADER_HEIGHT}px - 100px)`,
  overflowY: 'auto',
  display: 'flex',
  columnGap: 6,
  rowGap: 2,
  '@media screen and (max-width: 800px)': {
    flexWrap: 'wrap',
  },
  p: 4,
  '&>*': {
    flex: 1,
  },
};

export const title: SxProps = {
  display: 'flex',
  alignItems: 'center',
  columnGap: 2,
};
