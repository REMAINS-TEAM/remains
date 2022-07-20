import React from 'react';
import { differenceInDays, differenceInHours } from 'date-fns';
import CircularProgressWithLabel from 'components/CircularProgressWithLabel';
import { Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import { getPaidStatus } from 'store/selectors/user';
import { standardFormat } from 'utils';

function ExpiredDate({ date }: { date: Date }) {
  const isPaid = useSelector(getPaidStatus);

  const daysLeft =
    new Date() > date ? 0 : differenceInDays(new Date(date), new Date());

  if (daysLeft === null) return null;

  const hoursLeft =
    new Date() > date ? 0 : differenceInHours(new Date(date), new Date());

  return (
    <Tooltip
      title={
        !isPaid
          ? `Функционал ограничен! Дата окончания доступа: ${standardFormat(
              date,
            )}`
          : `Функционал сервиса будет ограничен через ${
              daysLeft !== 0 ? daysLeft + 'дн' : hoursLeft + 'ч'
            }`
      }
    >
      <div>
        <CircularProgressWithLabel
          value={daysLeft > 30 ? 100 : (daysLeft * 100) / 30}
          label={`${daysLeft < 0 ? 0 : daysLeft}д`}
        />
      </div>
    </Tooltip>
  );
}

export default React.memo(ExpiredDate);
