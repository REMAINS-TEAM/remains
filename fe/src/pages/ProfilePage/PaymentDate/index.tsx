import React from 'react';
import { standardFormat } from 'utils';
import { Box, Button } from '@mui/material';
import { setShowPopup } from 'store/slices/popups';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAdmin } from 'store/selectors/user';
import { FULL_ACCESS_DAYS } from 'global/constants';
import { differenceInDays } from 'date-fns';

const PaymentDate = ({ date }: { date: Date }) => {
  const isAdmin = useSelector(getIsAdmin);
  const dispatch = useDispatch();
  const openPaymentModal = () => dispatch(setShowPopup({ name: 'payment' }));

  const fullAccess =
    isAdmin || differenceInDays(new Date(date), new Date()) > FULL_ACCESS_DAYS;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        columnGap: 2,
        rowGap: 1,
        flexWrap: 'wrap',
      }}
    >
      <span>{!fullAccess ? standardFormat(date, true) : '∞'}</span>
      {!fullAccess && (
        <Button
          variant="contained"
          sx={{ height: 24 }}
          onClick={openPaymentModal}
        >
          Продлить
        </Button>
      )}
    </Box>
  );
};

export default PaymentDate;
