import React from 'react';
import { Box, Typography } from '@mui/material';
import * as styles from './styles';

const BrandsFilter = () => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h3" color="inherit">
        Производитель:
      </Typography>
    </Box>
  );
};

export default BrandsFilter;
