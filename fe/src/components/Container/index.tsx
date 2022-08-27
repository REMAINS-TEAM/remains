import React, { forwardRef } from 'react';
import { Box } from '@mui/material';

import * as styles from './styles';
import { ContainerProps } from './types';

const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ children, onClick, sx }, ref) => (
    <Box
      ref={ref}
      onClick={onClick}
      sx={{
        ...styles.container,
        ...sx,
      }}
    >
      {children}
    </Box>
  ),
);

export default React.memo(Container);
