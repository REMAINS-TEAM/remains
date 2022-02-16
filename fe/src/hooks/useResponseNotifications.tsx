import { useEffect } from 'react';
import { QueryStatus } from '@reduxjs/toolkit/query';
import useNotification, { notificationType } from 'hooks/useNotification';

export default function ({
  result,
  onSuccessText,
  onErrorText,
}: {
  result: any;
  onSuccessText?: string;
  onErrorText?: string;
}) {
  const notification = useNotification();

  useEffect(() => {
    switch (result.status) {
      case QueryStatus.fulfilled:
        notification.show(
          notificationType.SUCCESS,
          onSuccessText || 'Успешно!',
        );
        break;
      case QueryStatus.rejected:
        notification.show(notificationType.ERROR, onErrorText || 'Ошибка!');
        break;
    }
  }, [result.status]);
}
