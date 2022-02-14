import React from 'react';
import Popup from 'components/Popups/index';
import { AddItemPopupProps } from 'components/Popups/AddItemPopup/types';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import UploadedImage from './units/UploadedImage';
import * as styles from './styles';
import { Controller, useForm } from 'react-hook-form';
import useLimitTextField from 'hooks/useLimitTextField';
import itemsApi from 'store/api/items';

const MAX_LENGTH_TITLE = 80;
const MAX_LENGTH_DESCRIPTION = 200;

const fields = {
  TITLE: 'title',
  DESCRIPTION: 'description',
  PRICE: 'price',
};

function AddItemPopup({ open, setOpen, category }: AddItemPopupProps) {
  const [createItemRequest, result] = itemsApi.useCreateItemMutation();

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: Object.values(fields).reduce(
      (acc, value) => ({
        ...acc,
        [value]: '',
      }),
      {} as any,
    ),
  });

  // TODO: get categoryId, send form-data
  const onSubmit = (fieldsValues: {
    title: string;
    description: string;
    price: number;
  }) => {
    createItemRequest({
      ...fieldsValues,
      categoryId: 6,
      images: [] as string[],
    });
  };

  const titleLength = useLimitTextField({
    value: watch(fields.TITLE),
    setValue: (value) => setValue(fields.TITLE, value),
    maxLength: MAX_LENGTH_TITLE,
  });

  const descriptionLength = useLimitTextField({
    value: watch(fields.DESCRIPTION),
    setValue: (value) => setValue(fields.DESCRIPTION, value),
    maxLength: MAX_LENGTH_DESCRIPTION,
  });

  if (!category) return null;

  return (
    <Popup
      title={`Разместить товар в категории "${category.title}"`}
      okButtonText={'Разместить'}
      onOkClick={handleSubmit(onSubmit)}
      {...{ open, setOpen }}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Заголовок"
            type="text"
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={
                    MAX_LENGTH_TITLE - titleLength <= 0
                      ? { color: 'red' }
                      : null
                  }
                >
                  {MAX_LENGTH_TITLE - titleLength}
                </InputAdornment>
              ),
            }}
            {...field}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
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
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={
                    MAX_LENGTH_DESCRIPTION - descriptionLength <= 0
                      ? { color: 'red' }
                      : null
                  }
                >
                  {MAX_LENGTH_DESCRIPTION - descriptionLength}
                </InputAdornment>
              ),
            }}
            {...field}
          />
        )}
      />

      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <TextField
            margin="dense"
            id="price"
            label="Цена"
            type="number"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">₽</InputAdornment>,
            }}
            {...field}
          />
        )}
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
