import { Theme } from '@mui/material';

export const container = {
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'background.paper',
  borderRadius: 1,
  color: (theme: Theme) => theme.palette.grey[700],
  p: 1.5,
};
