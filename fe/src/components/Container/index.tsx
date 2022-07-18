import React, { ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';

import * as styles from './styles';

function Container({
  children,
  onClick,
  sx,
}: {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  sx?: SxProps;
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        ...styles.container,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default React.memo(Container);
