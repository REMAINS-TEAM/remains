import React from 'react';
import Popup from 'components/Popups/index';
import { ConfirmPopupProps } from 'components/Popups/ConfirmPopup/types';
import { Box, Typography } from '@mui/material';
import { ReportGmailerrorred as Icon } from '@mui/icons-material';

function ConfirmPopup<T>({
  onOkClick,
  open,
  setOpen,
  title,
  text,
}: ConfirmPopupProps<T>) {
  return (
    <Popup
      title={title || `Вы уверены?`}
      okButtonText={'Да'}
      onOkClick={onOkClick}
      {...{ open, setOpen }}
    >
      <Box sx={{ display: 'flex', columnGap: 2 }}>
        <Icon color={'warning'} />
        <Typography color="secondary">
          {text || 'Отменить действие будет невозможно!'}
        </Typography>
      </Box>
    </Popup>
  );
}

export default ConfirmPopup;
