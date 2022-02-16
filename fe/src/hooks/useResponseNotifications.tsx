import { useEffect } from 'react';
import { QueryStatus } from '@reduxjs/toolkit/query';
import useNotification, { notificationType } from 'hooks/useNotification';

export default function ({
  result,
  onSuccess,
  onError,
  onSuccessText,
  onErrorText,
}: {
  result: any;
  onSuccess?: (data?: any) => void;
  onError?: (e?: Error) => void;
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
        onSuccess && onSuccess(result.data);
        break;
      case QueryStatus.rejected:
        notification.show(notificationType.ERROR, onErrorText || 'Ошибка!');
        onError && onError(result.error);
        break;
    }

    console.log('res', result?.status);
  }, [result.status]);
}
