import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { LS_KEY_DEMO, LS_KEY_TOKEN } from 'global/constants';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const tryDemo = () => {
    localStorage.setItem(LS_KEY_DEMO, 'true');
    navigate('/', { replace: true });
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        columnGap: 4,
        rowGap: 0,
      }}
    >
      <Box>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h1">
            <strong>SELL REMAINS</strong>
          </Typography>
          <br />
          <Typography variant="h3">
            Сервис для продажи остатков Вашего бизнеса
          </Typography>
          <Typography variant="h4">Находится в стадии beta-testing</Typography>
        </Box>
        <Box component="ul" sx={{ color: '#666666', '&>*': { mb: 1 } }}>
          <li>Делитесь своими остатками товаров</li>
          <li>Добавляйте фото, описание и желаемую цену</li>
          <li>Просматривайте, чем делились другие</li>
          <li>Ищите по категориям, товарам и компаниям</li>
          <li>Фильтруйте по компаниям</li>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button variant="contained" sx={{ width: 250, height: 100, mb: 1 }}>
          Зарегистрироваться (пробный период 30дн)
        </Button>
        <Button
          variant="outlined"
          sx={{ width: 250, height: 100 }}
          onClick={tryDemo}
        >
          Попробовать без регистрации
        </Button>
      </Box>
    </Box>
  );
};

export default WelcomePage;
