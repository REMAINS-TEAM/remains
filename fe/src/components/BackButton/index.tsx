import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import * as styles from './styles';

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton sx={styles.button} onClick={onClick}>
      <ArrowBackIcon />
    </IconButton>
  );
}

export default React.memo(BackButton);
