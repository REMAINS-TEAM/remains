import React from 'react';
import Popup from 'components/Popups/index';
import { AddItemPopupProps } from 'components/Popups/AddItemPopup/types';

function AddItemPopup({ open, setOpen, category }: AddItemPopupProps) {
  if (!category) return null;

  return (
    <Popup
      title={`Добавить элемент в категорию "${category.title}"`}
      {...{ open, setOpen }}
    >
      test
    </Popup>
  );
}

export default React.memo(AddItemPopup);
