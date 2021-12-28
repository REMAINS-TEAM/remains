import React from 'react';
import Popup from 'components/Popups/index';
import { AddItemPopupProps } from 'components/Popups/AddItemPopup/types';
import { InputAdornment, TextField } from '@mui/material';

function AddItemPopup({ open, setOpen, category }: AddItemPopupProps) {
  if (!category) return null;

  return (
    <Popup
      title={`Разместить товар в категории "${category.title}"`}
      okButtonText={'Разместить'}
      {...{ open, setOpen }}
    >
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Заголовок"
        type="text"
        fullWidth
        variant="outlined"
        InputProps={{
          endAdornment: <InputAdornment position="end">100</InputAdornment>,
        }}
      />
      <TextField
        margin="dense"
        id="description"
        label="Описание"
        type="text"
        multiline
        fullWidth
        variant="outlined"
        rows={3}
        InputProps={{
          endAdornment: <InputAdornment position="end">300</InputAdornment>,
        }}
      />
      <TextField
        margin="dense"
        id="price"
        label="Цена"
        type="number"
        variant="outlined"
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
      />
      {/*TODO: добавить добавление картинок*/}
    </Popup>
  );
}

export default React.memo(AddItemPopup);
