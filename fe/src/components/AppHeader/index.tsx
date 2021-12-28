import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Menu as MenuIcon } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Search from 'components/Search';

import * as styles from './styles';
import { APP_HEADER_HEIGHT } from 'global/constants';

function AppHeader() {
  return (
    <AppBar position="fixed" sx={{ height: APP_HEADER_HEIGHT }}>
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.leftSide}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Business Remains
          </Typography>
          <Search />
        </Box>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default React.memo(AppHeader);
