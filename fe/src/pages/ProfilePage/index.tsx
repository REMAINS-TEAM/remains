import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as styles from './styles';
import { standardFormat } from 'utils';
import { getCurrentUser } from 'store/selectors/user';
import AuthLayout from 'layouts/AuthLayout';
import { Edit as EditIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import EditProfilePopup from 'components/Popups/EditProfilePopup';
import itemsApi from 'store/api/items';
import ItemCards from 'pages/Categories/units/ItemCards';
import Header from 'components/Header';
import { setShowPopup } from 'store/slices/popups';

function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const {
    data: myItems,
    isFetching,
    isSuccess,
  } = itemsApi.useGetItemsQuery(
    {
      userId: user?.id,
      limit: 100, // TODO: lazy loading
      offset: 0,
    },
    { skip: !user?.id },
  );

  const openEditProfileModal = () => setEditProfileModalOpen(true);
  const openPaymentModal = () => dispatch(setShowPopup({ name: 'payment' }));

  const rows = user
    ? [
        { title: 'Имя', value: user.name },
        { title: 'Телефон', value: '+' + user.phone },
        { title: 'E-mail', value: user.email },

        { title: 'Компания', value: user.company?.name },
        { title: 'Описание компании', value: user.company?.description },
        {
          title: 'Дата окончания доступа',
          value: (
            <>
              <span>{standardFormat(user.paymentExpiredDate, true)}</span>
              <Button
                variant="contained"
                sx={{ ml: 3, height: '24px' }}
                onClick={openPaymentModal}
              >
                Продлить
              </Button>
            </>
          ),
        },
      ]
    : [];

  return (
    <AuthLayout>
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

        <Paper sx={{ p: 2 }}>
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
                    <Typography variant="inherit" color={'secondary'}>
                      {row.value || 'Не указано'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <br />
        <Header title="Мои предложения" />

        <ItemCards items={myItems} isLoading={isFetching} />
        {isSuccess && !myItems?.length && (
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
