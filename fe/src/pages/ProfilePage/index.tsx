import React from 'react';
import MainLayout from 'layouts/MainLayout';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import * as styles from './styles';
import { standardFormat } from 'utils';

// TODO: только для авторизованных

function ProfilePage() {
  const user = useSelector((state: RootState) => state.user);

  if (!user) {
    return <MainLayout>Вы не авторизованы</MainLayout>;
  }

  const rows = [
    { title: 'Имя', value: user.name },
    { title: 'Телефон', value: '+' + user.phone },
    { title: 'E-mail', value: user.email },

    { title: 'Компания', value: user.company?.name },
    { title: 'Описание компании', value: user.company?.description },
    {
      title: 'Дата последнего платежа',
      value: standardFormat(user.paymentExpiredDate, true),
    },
  ];

  return (
    <MainLayout>
      <Box sx={styles.contentContainer}>
        <Typography variant="h1" color="secondary" sx={{ my: 3 }}>
          Мой профиль
        </Typography>

        <Table sx={{ maxWidth: 500, ml: -2 }}>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.title}>
                <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                  {row.title}:
                </TableCell>
                <TableCell align="left">
                  <Typography variant="inherit" color={'secondary'}>
                    {row.value || 'Не указано'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Typography variant="h1" color="secondary" sx={{ mt: 6, mb: 3 }}>
          Мои предложения
        </Typography>
        <Typography variant="inherit" color={'secondary'}>
          <p>Пока вы ничего не выкладывали</p>
          <p>
            Чтобы делиться остатками и следить за тем, что выкладывают другие -
            следите за положительным балансом счета
          </p>
        </Typography>
      </Box>
    </MainLayout>
  );
}

export default React.memo(ProfilePage);
