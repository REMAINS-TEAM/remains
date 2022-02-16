import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { hide } from 'store/slices/notification';

export default function MainNotification() {
  const { text, type, open } = useSelector(
    (state: RootState) => state.notification,
  );
  const dispatch = useDispatch();

  const closeHandler = () => dispatch(hide());

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={4000}
      open={open}
      onClose={closeHandler}
      key={'notification'}
    >
      <Alert onClose={closeHandler} severity={type} sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  );
}
