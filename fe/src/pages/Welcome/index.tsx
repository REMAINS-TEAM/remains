import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { LS_KEY_DEMO } from 'global/constants';
import { useNavigate } from 'react-router-dom';
import { setShowPopup } from 'store/slices/popups';
import { useDispatch, useSelector } from 'react-redux';
import * as styles from './styles';
import { getCurrentUser } from 'store/selectors/user';

const WelcomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(getCurrentUser);

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  const tryDemo = () => {
    localStorage.setItem(LS_KEY_DEMO, 'true');
    navigate('/', { replace: true });
  };

  const auth = () => dispatch(setShowPopup({ name: 'auth', isShow: true }));

  return (
    <Box sx={styles.contentContainer}>
      <Box>
        <Box sx={styles.header}>
          <Typography variant="h1">
            <strong>SELL REMAINS</strong>
          </Typography>
          <br />
          <Typography variant="h3">
            Сервис для продажи остатков Вашего бизнеса
          </Typography>
          <Typography variant="h4">Находится в стадии beta-testing</Typography>
        </Box>
        <Box component="ul" sx={styles.featuresList}>
          <li>Делитесь своими остатками товаров</li>
          <li>Добавляйте фото, описание и желаемую цену</li>
          <li>Просматривайте, чем делились другие</li>
          <li>Ищите по категориям, товарам и компаниям</li>
          <li>Фильтруйте по компаниям</li>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button variant="contained" sx={styles.actionButton} onClick={auth}>
          <Typography sx={{ fontSize: 14, mb: 1 }}>
            Зарегистрироваться (пробный период 30дн)
          </Typography>
          <Typography component="div" sx={{ fontSize: 10 }}>
            или войти
          </Typography>
        </Button>
        <Button variant="outlined" sx={styles.actionButton} onClick={tryDemo}>
          <Typography sx={{ fontSize: 14, mb: 1 }}>
            Попробовать без регистрации
          </Typography>
          <Typography component="div" sx={{ fontSize: 10 }}>
            (функционал ограничен)
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default WelcomePage;
