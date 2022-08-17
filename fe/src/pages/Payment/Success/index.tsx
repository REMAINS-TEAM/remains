import React from 'react';
import MainLayout from 'layouts/MainLayout';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import * as styles from './styles';

const PaymentSuccessPage = () => {
  return (
    <MainLayout>
      <Box sx={styles.container}>
        <Typography variant="h1" color="secondary" textAlign="center">
          Платеж успешно проведен
        </Typography>
        <Link to="/">Вернуться на главную</Link>
      </Box>
    </MainLayout>
  );
};

export default PaymentSuccessPage;
