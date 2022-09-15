import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import * as styles from 'pages/ProfilePage/styles';
import PaymentDate from 'pages/ProfilePage/PaymentDate';
import { User } from 'store/slices/user';

const ProfileInfo = ({ user }: { user?: User | null }) => {
  if (!user) return null;

  const rows = [
    { title: 'Имя', value: user.name },
    { title: 'Телефон', value: '+' + user.phone },
    { title: 'E-mail', value: user.email },

    { title: 'Компания', value: user.company?.name },
    { title: 'Описание компании', value: user.company?.description },
    {
      title: 'Дата окончания доступа',
      value: <PaymentDate date={user.paymentExpiredDate} />,
    },
  ];

  return (
    <Paper sx={{ p: 2, mb: 6 }}>
      <Table sx={{ maxWidth: 500 }}>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                {row.title}:
              </TableCell>
              <TableCell align="left">
                <Typography
                  variant="inherit"
                  color={'secondary'}
                  sx={styles.tableValue}
                >
                  {row.value || 'Не указано'}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
          <br />
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ProfileInfo;
