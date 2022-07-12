import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {
  InfoOutlined as InfoIcon,
  PersonRounded as UserIcon,
} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Tooltip } from '@mui/material';
import Loader from '@mui/material/CircularProgress';
import Search from 'components/Search';

import * as styles from './styles';
import { APP_HEADER_HEIGHT, LS_KEY_TOKEN } from 'global/constants';
import AuthPopup from 'components/Popups/AuthPopup';
import { useSelector } from 'react-redux';
import userApi from 'store/api/user';
import ProfileMenu from 'components/AppHeader/units/ProfileMenu';
import CircularProgressWithLabel from 'components/CircularProgressWithLabel';
import { differenceInDays, differenceInHours, format } from 'date-fns';
import {
  getCurrentUser,
  getPaymentNotExpiredStatus,
} from 'store/selectors/user';
import { Link } from 'react-router-dom';

function AppHeader() {
  const { isFetching } = userApi.useMeQuery(undefined, {
    skip: !localStorage.getItem(LS_KEY_TOKEN),
  });
  const user = useSelector(getCurrentUser);
  const paymentNotExpired = useSelector(getPaymentNotExpiredStatus);
  const [authPopupOpen, setAuthPopupOpen] = useState(false);

  const [profileButtonRef, setProfileButtonRef] = useState<HTMLElement | null>(
    null,
  );

  const daysLeft =
    user &&
    (new Date() > user.paymentExpiredDate
      ? 0
      : differenceInDays(new Date(user.paymentExpiredDate), new Date()));

  const hoursLeft =
    user &&
    (new Date() > user.paymentExpiredDate
      ? 0
      : differenceInHours(new Date(user.paymentExpiredDate), new Date()));

  const loginClickHandler = () => {
    setAuthPopupOpen(true);
  };

  const profileClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    setProfileButtonRef(event.currentTarget);
  };

  return (
    <AppBar position="fixed" sx={{ height: APP_HEADER_HEIGHT }}>
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.leftSide}>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            <Link className="link" to={'/'}>
              Business Remains
            </Link>
          </Typography>
          <Search />
        </Box>
        <Box sx={styles.rightSide}>
          {isFetching ? (
            <Loader color={'secondary'} size={20} />
          ) : (
            <>
              {user && daysLeft !== null && (
                <Tooltip
                  title={
                    !paymentNotExpired
                      ? `Функционал ограничен! Дата истечения оплаты: ${format(
                          new Date(user.paymentExpiredDate || 0),
                          'dd.MM.yyyy HH:mm',
                        )}`
                      : `Функционал сервиса будет ограничен через ${
                          daysLeft !== 0 ? daysLeft + 'дн' : hoursLeft + 'ч'
                        }`
                  }
                >
                  <div>
                    <CircularProgressWithLabel
                      value={daysLeft > 30 ? 100 : (daysLeft * 100) / 30}
                      label={`${daysLeft < 0 ? 0 : daysLeft}д`}
                    />
                  </div>
                </Tooltip>
              )}
              <Button
                color="inherit"
                onClick={user ? profileClickHandler : loginClickHandler}
                sx={{ columnGap: 1 }}
              >
                {user?.phone && !user?.name && (
                  <Tooltip title="Заполните информацию о себе">
                    <InfoIcon color="warning" />
                  </Tooltip>
                )}

                {user?.name || user?.phone || 'Вход / регистрация'}
                <UserIcon />
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
      <AuthPopup open={authPopupOpen} setOpen={setAuthPopupOpen} />
      <ProfileMenu
        anchorEl={profileButtonRef}
        setAnchorEl={setProfileButtonRef}
      />
    </AppBar>
  );
}

export default React.memo(AppHeader);
