import React from 'react';
import { Box, Typography } from '@mui/material';
import * as styles from './styles';
import { NotificationPlateProps } from 'components/NotificationPlate/types';
import { ErrorOutline } from '@mui/icons-material';

function NotificationPlate({ title, color = 'black' }: NotificationPlateProps) {
  return (
    <Box sx={{ ...styles.notificationContainer, color }}>
      <ErrorOutline color={'inherit'} fontSize={'small'} />
      <Typography color={'inherit'}>{title}</Typography>
    </Box>
  );
}

export default React.memo(NotificationPlate);
