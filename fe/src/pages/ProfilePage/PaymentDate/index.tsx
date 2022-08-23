import React from 'react';
import { standardFormat } from 'utils';
import { Box, Button } from '@mui/material';
import { setShowPopup } from 'store/slices/popups';
import { useDispatch } from 'react-redux';

const PaymentDate = ({ date }: { date: Date }) => {
  const dispatch = useDispatch();
  const openPaymentModal = () => dispatch(setShowPopup({ name: 'payment' }));

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
      <span>{standardFormat(date, true)}</span>
      <Button
        variant="contained"
        sx={{ height: 24 }}
        onClick={openPaymentModal}
      >
        Продлить
      </Button>
    </Box>
  );
};

export default PaymentDate;
