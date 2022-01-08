import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Menu as MenuIcon } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Loader from '@mui/material/CircularProgress';
import { PersonRounded as UserIcon } from '@mui/icons-material';
import Search from 'components/Search';

import * as styles from './styles';
import { APP_HEADER_HEIGHT, LS_KEY_TOKEN } from 'global/constants';
import AuthPopup from 'components/Popups/AuthPopup';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import userApi from 'store/api/user';

function AppHeader() {
  const { isFetching } = userApi.useMeQuery(undefined, {
    skip: !localStorage.getItem(LS_KEY_TOKEN),
  });
  const user = useSelector((state: RootState) => state.user);
  const [authPopupOpen, setAuthPopupOpen] = useState(false);

  const loginClickHandler = () => {
    setAuthPopupOpen(true);
  };

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
        {isFetching ? (
          <Loader color={'secondary'} size={20} />
        ) : (
          <Button
            color="inherit"
            onClick={loginClickHandler}
            sx={{ columnGap: 1 }}
          >
            {user.name || 'Login'}
            <UserIcon />
          </Button>
        )}
      </Toolbar>
      <AuthPopup open={authPopupOpen} setOpen={setAuthPopupOpen} />
    </AppBar>
  );
}

export default React.memo(AppHeader);
