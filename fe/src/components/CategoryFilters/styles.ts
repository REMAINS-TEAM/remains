import { Theme } from '@mui/material';

export const container = {
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'background.paper',
  // rowGap: 2,
  mt: 1,
  px: 2.5,
  pt: 1,
  pb: 3,

  borderRadius: 1,
  boxShadow: (theme: Theme) => `0 0 10px ${theme.palette.grey[300]}`,
};
