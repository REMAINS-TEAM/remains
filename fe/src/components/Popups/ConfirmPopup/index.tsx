import React, { useEffect } from 'react';
import Popup from 'components/Popups/index';
import { ConfirmPopupProps } from 'components/Popups/ConfirmPopup/types';

function ConfirmPopup({ onOkClick, open, setOpen }: ConfirmPopupProps) {
  return (
    <Popup
      title={`Вы уверены?`}
      okButtonText={'Да'}
      onOkClick={onOkClick}
      {...{ open, setOpen }}
    >
      <div />
    </Popup>
  );
}

export default ConfirmPopup;
