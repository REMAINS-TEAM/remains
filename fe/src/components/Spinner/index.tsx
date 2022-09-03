import React from 'react';
import { Box, CircularProgress, Theme } from '@mui/material';
import { SxProps } from '@mui/system';

const Spinner = ({ size = 22, sx }: { size?: number; sx?: SxProps<Theme> }) => {
  return (
    <Box sx={{ width: '100%', textAlign: 'center', ...sx }}>
      <CircularProgress size={size} />
    </Box>
  );
};

export default Spinner;
