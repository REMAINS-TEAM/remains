import React, { useMemo } from 'react';
import { differenceInDays, differenceInHours } from 'date-fns';
import CircularProgressWithLabel from 'components/CircularProgressWithLabel';
import { Box, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import { getIsAdmin, getPaidStatus } from 'store/selectors/user';
import { standardFormat } from 'utils';
import Typography from '@mui/material/Typography';
import { FULL_ACCESS_DAYS } from 'global/constants';

function ExpiredDate({ date, onClick }: { date: Date; onClick?: () => void }) {
  const isPaid = useSelector(getPaidStatus);
  const isAdmin = useSelector(getIsAdmin);

  const { title, value, label } = useMemo(() => {
    const daysLeft =
      new Date() > date ? 0 : differenceInDays(new Date(date), new Date());

    const hoursLeft =
      new Date() > date ? 0 : differenceInHours(new Date(date), new Date());

    if (isAdmin || daysLeft > FULL_ACCESS_DAYS)
      return {
        title: 'У Вас бесконечный полный доступ',
        value: 100,
        label: <Typography variant="h2">∞</Typography>,
      };

    if (isPaid) {
      return {
        title: `Функционал сервиса будет ограничен через ${
          daysLeft !== 0 ? daysLeft + 'дн' : hoursLeft + 'ч'
        }. Нажмите для оплаты.`,
        value: daysLeft > 30 ? 100 : (daysLeft * 100) / 30,
        label: `${daysLeft}д`,
      };
    } else {
      return {
        title: `Функционал ограничен! Дата окончания доступа: ${standardFormat(
          date,
        )}. Нажмите для оплаты.`,
        value: 0,
        label: '0д',
      };
    }
  }, [isPaid, isAdmin, date]);

  return (
    <Tooltip title={title}>
      <Box onClick={!isAdmin ? onClick : undefined} sx={{ cursor: 'pointer' }}>
        <CircularProgressWithLabel value={value} label={label} />
      </Box>
    </Tooltip>
  );
}

export default React.memo(ExpiredDate);
