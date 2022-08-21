import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const contentContainer: SxProps = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  columnGap: 4,
  rowGap: 0,
};

export const header: SxProps = {
  textAlign: 'center',
  mb: 4,
};

export const featuresList: SxProps<Theme> = {
  color: (theme: Theme) => theme.palette.secondary.main,
  '&>*': { mb: 1 },
};

export const actionButton: SxProps = {
  width: 250,
  height: 100,
  mb: 1,
  display: 'flex',
  flexDirection: 'column',
};
