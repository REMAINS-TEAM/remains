import React, { ReactNode } from 'react';
import * as styles from './styles';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

function EmptyState({
  text,
  children,
  description,
}: {
  text?: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <Box sx={styles.rootContainer}>
      <ErrorOutline color="secondary" fontSize={'large'} />
      <Typography variant="body1" color="secondary">
        {text || 'Нет данных'}
      </Typography>
      {description && (
        <Typography variant="body2" color="secondary">
          {description}
        </Typography>
      )}
      <br />
      {children}
    </Box>
  );
}

export default React.memo(EmptyState);
