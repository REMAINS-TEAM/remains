import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const inputPaper: SxProps = {
  p: '1px 4px',
  display: 'flex',
  alignItems: 'center',
  width: 315,
  height: 36,
  ml: 1,
};

export const menuPaper: SxProps = {
  minWidth: 315,
  minHeight: 270,
  maxHeight: 400,
  overflowX: 'hidden',
  overflowY: 'auto',
  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
  background: 'rgba(255,255,255,0.95)',
  mt: 1,
  ml: -1.5,
};

export const menuItemHeader = {
  fontSize: 16,
  opacity: '1 !important',
  fontWeight: 'bold',
  color: (theme: Theme) => theme.palette.grey[700],
  '& svg': {
    fontSize: 20,
    color: (theme: Theme) => theme.palette.grey[700],
  },
};

export const menuItem = {
  pl: '52px',
  color: (theme: Theme) => theme.palette.grey[700],
};
