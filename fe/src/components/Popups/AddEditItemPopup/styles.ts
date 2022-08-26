import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const imagesContainer: SxProps = {
  display: 'flex',
  width: '100%',
  columnGap: 1,
  overflowX: 'auto',
  py: 1,
};

export const rules: SxProps<Theme> = {
  p: 0,
  pl: 2,
  m: 0,
  mb: 2,

  color: (theme: Theme) => theme.palette.secondary.light,
  fontSize: 12,
};
