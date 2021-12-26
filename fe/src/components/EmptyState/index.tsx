import React from 'react';
import * as styles from './styles';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

function EmptyState({ text }: { text?: string }) {
  return (
    <Box sx={styles.rootContainer}>
      <ErrorOutline color="secondary" />
      <Typography variant="body1" color="secondary">
        {text || 'Нет данных'}
      </Typography>
    </Box>
  );
}

export default React.memo(EmptyState);
