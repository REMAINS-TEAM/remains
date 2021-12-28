import React from 'react';
import Popup from 'components/Popups/index';
import { AddItemPopupProps } from 'components/Popups/AddItemPopup/types';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import UploadedImage from './units/UploadedImage';
import * as styles from './styles';
import { padding } from '@mui/system';

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
          endAdornment: <InputAdornment position="end">80</InputAdornment>,
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
          endAdornment: <InputAdornment position="end">200</InputAdornment>,
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
      <Typography variant="subtitle1" color="secondary" sx={{ p: 1.5 }}>
        Фото:
      </Typography>
      <Box sx={styles.imagesContainer}>
        <UploadedImage
          src={
            'https://www.worldofquartz.ru/upload/iblock/ee4/ee458489521e9bc9a3aec4692fd365ec.jpg'
          }
        />
        <UploadedImage />
      </Box>
    </Popup>
  );
}

export default React.memo(AddItemPopup);
