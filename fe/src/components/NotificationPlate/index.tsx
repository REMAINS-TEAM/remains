import React from 'react';
import { Box, PaletteColor, Typography, useTheme } from '@mui/material';
import * as styles from './styles';
import { NotificationPlateProps } from 'components/NotificationPlate/types';
import { ErrorOutline } from '@mui/icons-material';

function NotificationPlate({
  title,
  color,
  onClick,
  sx = {},
}: NotificationPlateProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...styles.notificationContainer,
        ...sx,
        color: (theme.palette[color || 'info'] as PaletteColor).light,
      }}
      onClick={onClick}
    >
      <ErrorOutline color={'inherit'} fontSize={'small'} />
      <Typography variant={'inherit'}>{title}</Typography>
    </Box>
  );
}

export default React.memo(NotificationPlate);
