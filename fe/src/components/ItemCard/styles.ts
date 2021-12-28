import { SxProps } from '@mui/system';

export const itemContainer: SxProps = {
  position: 'relative',
  width: '100%',
  display: 'flex',
  minHeight: '200px',
  height: '200px',
  columnGap: 1,
  justifyContent: 'space-between',
  overflow: 'hidden',
  px: 2,
  py: 4,
};

export const leftSide: SxProps = {
  display: 'flex',
  height: '100%',
  columnGap: 2,
  paddingRight: 2,
  overflow: 'hidden',
};

export const rightSide: SxProps = {
  minWidth: '150px',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  flexDirection: 'column',
  height: '100%',
  columnGap: 2,
  rowGap: 1,
};

export const rightTop: SxProps = {
  display: 'flex',
  alignItems: 'flex-end',
  rowGap: 1,
  flexDirection: 'column',
};

export const rightBottom: SxProps = {
  display: 'flex',
  alignItems: 'flex-end',
  rowGap: 1,
};

export const dotsButton: SxProps = {
  position: 'absolute',
  right: '4px',
  top: '-2px',
  p: 1,
};
