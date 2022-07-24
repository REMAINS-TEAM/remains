import React from 'react';
import { Box } from '@mui/system';
import * as styles from './styles';
import BackButton from 'components/BackButton';
import { HeaderProps } from './types';
import { Typography } from '@mui/material';

const Header = ({
  withBackButton,
  onBackButtonClick,
  title,
  left,
  right,
}: HeaderProps) => {
  return (
    <Box sx={styles.headerContainer}>
      <Box sx={styles.column}>
        {withBackButton && <BackButton onClick={onBackButtonClick} />}
        <Typography variant="h1" color="secondary">
          {title}
        </Typography>
        {left}
      </Box>
      <Box sx={styles.column}>{right}</Box>
    </Box>
  );
};

export default Header;
