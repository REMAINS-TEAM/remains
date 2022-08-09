import React from 'react';
import { Box, PaletteColor, Typography, useTheme } from '@mui/material';
import * as styles from './styles';
import { NotificationPlateProps } from 'components/NotificationPlate/types';
import { ErrorOutline } from '@mui/icons-material';

function NotificationPlate({ title, color }: NotificationPlateProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...styles.notificationContainer,
        color: (theme.palette[color || 'info'] as PaletteColor).main,
      }}
    >
      <ErrorOutline color={'inherit'} fontSize={'small'} />
      <Typography>{title}</Typography>
    </Box>
  );
}

export default React.memo(NotificationPlate);
