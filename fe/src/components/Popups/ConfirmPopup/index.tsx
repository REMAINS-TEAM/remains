import React from 'react';
import Popup from 'components/Popups/index';
import { ConfirmPopupProps } from 'components/Popups/ConfirmPopup/types';
import { Box, Typography } from '@mui/material';
import { ReportGmailerrorred as Icon } from '@mui/icons-material';

function ConfirmPopup({ onOkClick, open, setOpen }: ConfirmPopupProps) {
  return (
    <Popup
      title={`Вы уверены?`}
      okButtonText={'Да'}
      onOkClick={onOkClick}
      {...{ open, setOpen }}
    >
      <Box sx={{ display: 'flex', columnGap: 2 }}>
        <Icon color={'error'} />
        <Typography>Отменить действие будет невозможно!</Typography>
      </Box>
    </Popup>
  );
}

export default ConfirmPopup;
