import React, { useEffect, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {
  InfoOutlined as InfoIcon,
  Menu as MenuIcon,
  PersonRounded as UserIcon,
  VerifiedUser as AdminUserIcon,
} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
  Box,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Loader from '@mui/material/CircularProgress';
import Search from 'components/Search';

import * as styles from './styles';
import { APP_HEADER_HEIGHT, LS_KEY_DEMO, LS_KEY_TOKEN } from 'global/constants';
import AuthPopup from 'components/Popups/AuthPopup';
import { useDispatch, useSelector } from 'react-redux';
import userApi from 'store/api/user';
import ProfileMenu from 'components/AppHeader/units/ProfileMenu';
import { getCurrentUser, getIsAdmin } from 'store/selectors/user';
import { Link } from 'react-router-dom';
import { setOpen } from 'store/slices/menu';
import { getMenuState } from 'store/selectors/menu';
import ExpiredDate from 'components/AppHeader/units/ExpiredDate';
import PaymentPopup from 'components/Popups/PaymentPopup';
import { getPopupsState } from 'store/selectors/popups';
import { setShowPopup } from 'store/slices/popups';
import { getGeneralVariables } from 'store/selectors/general';

function AppHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();

  const isAdmin = useSelector(getIsAdmin);
  const mobileMenu = useSelector(getMenuState);
  const general = useSelector(getGeneralVariables);
  const user = useSelector(getCurrentUser);
  const popups = useSelector(getPopupsState);

  const { isFetching } = userApi.useMeQuery(undefined, {
    skip: !general[LS_KEY_TOKEN],
  });

  const [profileButtonRef, setProfileButtonRef] = useState<HTMLElement | null>(
    null,
  );

  const loginClickHandler = () =>
    dispatch(setShowPopup({ name: 'auth', isShow: true }));
  const showPaymentPopup = () =>
    dispatch(setShowPopup({ name: 'payment', isShow: true }));

  const profileClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    setProfileButtonRef(event.currentTarget);
  };

  const showMobileMenu = () => dispatch(setOpen(true));
  const hideMobileMenu = () => dispatch(setOpen(false));
  const toggleMobileMenu = () => dispatch(setOpen(!mobileMenu.open));

  useEffect(() => {
    if (!isMobile) {
      showMobileMenu();
    } else {
      hideMobileMenu();
    }
  }, [isMobile]);

  return (
    <AppBar position="fixed" sx={{ height: APP_HEADER_HEIGHT }}>
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.leftSide}>
          {isMobile &&
            mobileMenu.showBurger &&
            (general[LS_KEY_DEMO] || general[LS_KEY_TOKEN]) && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleMobileMenu}
              >
                <MenuIcon />
              </IconButton>
            )}

          <Typography variant="h6" component="h1" sx={{ flexGrow: 1, mr: 2 }}>
            <Link className="link" to={'/'}>
              {!isMobile ? 'Sell Remains' : 'SR'}
            </Link>
          </Typography>
          {(general[LS_KEY_DEMO] || general[LS_KEY_TOKEN]) && (
            <>
              <Search />
              {/*<IconButton color="inherit" onClick={() => null}>*/}
              {/*  <FiltersIcon />*/}
              {/*</IconButton>*/}
            </>
          )}
        </Box>
        <Box sx={styles.rightSide}>
          {isFetching ? (
            <Loader color={'secondary'} size={20} />
          ) : (
            <>
              {user && (
                <ExpiredDate
                  date={user.paymentExpiredDate}
                  onClick={showPaymentPopup}
                />
              )}
              {!isMobile ? (
                <Button
                  color="inherit"
                  onClick={user ? profileClickHandler : loginClickHandler}
                  sx={{ columnGap: 1 }}
                >
                  {user?.phone && !user?.name && (
                    <Tooltip title="Заполните информацию о себе">
                      <InfoIcon color="warning" sx={styles.infoIcon} />
                    </Tooltip>
                  )}

                  {user?.name || user?.phone || 'Вход / регистрация'}
                  {!isAdmin ? (
                    <UserIcon />
                  ) : (
                    <Tooltip title="Вы администратор">
                      <AdminUserIcon />
                    </Tooltip>
                  )}
                </Button>
              ) : (
                <IconButton
                  color={'inherit'}
                  onClick={user ? profileClickHandler : loginClickHandler}
                >
                  {!isAdmin ? <UserIcon /> : <AdminUserIcon />}
                </IconButton>
              )}
            </>
          )}
        </Box>
      </Toolbar>
      <AuthPopup
        open={popups.auth}
        setOpen={(isShow) => dispatch(setShowPopup({ name: 'auth', isShow }))}
      />
      <PaymentPopup
        open={popups.payment}
        setOpen={(isShow) =>
          dispatch(setShowPopup({ name: 'payment', isShow }))
        }
      />
      <ProfileMenu
        anchorEl={profileButtonRef}
        setAnchorEl={setProfileButtonRef}
      />
    </AppBar>
  );
}

export default React.memo(AppHeader);
