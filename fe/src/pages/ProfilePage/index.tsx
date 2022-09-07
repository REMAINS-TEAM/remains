import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import * as styles from './styles';
import { getCurrentUser } from 'store/selectors/user';
import AuthLayout from 'layouts/AuthLayout';
import { Edit as EditIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import EditProfilePopup from 'components/Popups/EditProfilePopup';
import itemsApi from 'store/api/items';
import ItemCards from 'pages/Categories/units/ItemCards';
import Header from 'components/Header';
import PaymentDate from 'pages/ProfilePage/PaymentDate';
import useInfinityScroll from 'hooks/useInfinityScroll';

function ProfilePage() {
  const user = useSelector(getCurrentUser);

  const {
    handleScroll,
    items: myItems,
    isSuccess,
    isFetchingCur,
    isFetchingNext,
  } = useInfinityScroll(
    itemsApi.useGetItemsQuery,
    { userId: user?.id },
    { skip: !user?.id },
  );

  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const openEditProfileModal = () => setEditProfileModalOpen(true);

  const rows = user
    ? [
        { title: 'Имя', value: user.name },
        { title: 'Телефон', value: '+' + user.phone },
        { title: 'E-mail', value: user.email },

        { title: 'Компания', value: user.company?.name },
        { title: 'Описание компании', value: user.company?.description },
        {
          title: 'Дата окончания доступа',
          value: <PaymentDate date={user.paymentExpiredDate} />,
        },
      ]
    : [];

  return (
    <AuthLayout onScroll={handleScroll}>
      <Box sx={styles.contentContainer}>
        <Header
          title="Мой профиль"
          withBackButton
          left={
            <IconButton
              color={!user?.name ? 'warning' : 'secondary'}
              onClick={openEditProfileModal}
              sx={!user?.name ? styles.accentedBtn : null}
            >
              <EditIcon />
            </IconButton>
          }
        />

        <Paper sx={{ p: 2, mb: 6 }}>
          <Table sx={{ maxWidth: 500 }}>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.title}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: 600 }}
                  >
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

        <Header title="Мои предложения" />

        <ItemCards items={myItems} hidePayNotification />
        {isSuccess && !isFetchingCur && !isFetchingNext && !myItems?.length && (
          <Typography variant="inherit" color={'secondary'} sx={{ mt: -2 }}>
            <p>Пока вы ничего не выкладывали.</p>
            <p>
              Чтобы делиться остатками и видеть, что выкладывают другие -
              следите за положительным балансом счета.
            </p>
          </Typography>
        )}
      </Box>

      <EditProfilePopup
        open={editProfileModalOpen}
        setOpen={setEditProfileModalOpen}
      />
    </AuthLayout>
  );
}

export default React.memo(ProfilePage);
