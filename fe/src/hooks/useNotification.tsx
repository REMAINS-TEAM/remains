import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import {
  hide as hideNotification,
  show as showNotification,
} from 'store/slices/notification';
import { AlertColor } from '@mui/material';

export const notificationType = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
} as Record<'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR', AlertColor>;

export default function () {
  const { text, type, open } = useSelector(
    (state: RootState) => state.notification,
  );
  const dispatch = useDispatch();

  const show = (type: AlertColor, text: string) => {
    dispatch(showNotification({ type, text }));
  };

  const hide = () => {
    dispatch(hideNotification());
  };

  return { text, type, open, hide, show };
}
