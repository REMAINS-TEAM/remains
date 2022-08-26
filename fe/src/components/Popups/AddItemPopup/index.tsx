import React, { useState } from 'react';
import Popup from 'components/Popups/index';
import { AddItemPopupProps } from 'components/Popups/AddItemPopup/types';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import UploadedImage from './units/UploadedImage';
import * as styles from './styles';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import useLimitTextField from 'hooks/useLimitTextField';
import itemsApi from 'store/api/items';
import useResponseNotifications from 'hooks/useResponseNotifications';
import useNotification, { notificationType } from 'hooks/useNotification';
import {
  AddItemSchema,
  MAX_LENGTH_DESCRIPTION,
  MAX_LENGTH_TITLE,
} from './validation';
import { useSelector } from 'react-redux';
import { getPaidStatus } from 'store/selectors/user';
import NotificationPlate from 'components/NotificationPlate';

const fields = {
  TITLE: 'title',
  DESCRIPTION: 'description',
  PRICE: 'price',
};

type FieldsType = typeof fields[keyof typeof fields];

function AddItemPopup({ open, setOpen, category }: AddItemPopupProps) {
  const isPaid = useSelector(getPaidStatus);

  const [createItemRequest, result] = itemsApi.useCreateItemMutation();

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const notification = useNotification();

  useResponseNotifications({
    result,
    onSuccessText: 'Товар добавлен в выбранную категорию',
    onErrorText: 'Ошибка при добавлении товара',
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(AddItemSchema),
    defaultValues: Object.values(fields).reduce(
      (acc, value) => ({
        ...acc,
        [value]: '',
      }),
      {} as Record<FieldsType, string>,
    ),
  });

  const resetForm = () => {
    reset();
    setImageFiles([]);
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

  const onSubmit = (fieldsValues: Record<FieldsType, string>) => {
    if (Object.keys(errors).length) return;
    if (!imageFiles.length) {
      notification.show(
        notificationType.ERROR,
        'Добавьте хотя бы одно изображение',
      );
      return;
    }

    const formData = new FormData();

    formData.append('categoryId', String(category.id));
    Object.entries(fieldsValues).forEach(([key, value]) =>
      formData.append(key, value),
    );
    imageFiles.forEach((file) => formData.append('images', file, file.name));

    createItemRequest(formData);
    setOpen(false);
    resetForm();
  };

  const addFileHandler = async (file: File) => {
    const existedTheSame = !!imageFiles.find(
      (f) => f.name === file.name && f.size === file.size,
    );
    if (existedTheSame) {
      notification.show(notificationType.ERROR, 'Такое изображение уже есть');
      return;
    }
    setImageFiles((prev) => [...prev, file]);
  };

  const deleteImageHandler = (file: File) => {
    setImageFiles((prev) =>
      prev.filter((f) => f.name !== file.name && f.size !== file.size),
    );
  };

  return (
    <Popup
      title={`Разместить товар в категории "${category.title}"`}
      okButtonText={'Разместить'}
      onOkClick={handleSubmit(onSubmit)}
      okButtonProps={{ disabled: !isPaid }}
      onClose={resetForm}
      closeWhenSubmit={false}
      {...{ open, setOpen }}
    >
      {!isPaid && (
        <NotificationPlate
          title="Оплатите сервис для размещения товаров"
          color="error"
          sx={{ mb: 2 }}
        />
      )}
      {isPaid && (
        <>
          <Box component="ul" sx={styles.rules}>
            <li>
              Не указывайте контакты в заголовке и описании, а также на фото;
            </li>
            <li>Фото должны содержать изображения продаваемого товара;</li>
            <li>Не размещайте товары, которые не собираетесь продавать;</li>
            <li>
              Размещайте товары только в подходящей категории. Если нужной
              категории нет - разместите в категории "Другое";
            </li>
            <li>После продажи удалите товар</li>
          </Box>
          <NotificationPlate
            title="За несоблюдение правил, аккаунт будет заблокирован!"
            color="secondary"
            sx={{ mb: 2, fontSize: 12 }}
          />
        </>
      )}
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            autoFocus
            margin="dense"
            id={fields.TITLE}
            label="Заголовок"
            type="text"
            fullWidth
            variant="outlined"
            error={!!errors[fields.TITLE]}
            helperText={errors[fields.TITLE]?.message}
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
            id={fields.DESCRIPTION}
            label="Описание"
            type="text"
            multiline
            fullWidth
            variant="outlined"
            rows={3}
            error={!!errors[fields.DESCRIPTION]}
            helperText={errors[fields.DESCRIPTION]?.message}
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
            error={!!errors[fields.PRICE]}
            helperText={errors[fields.PRICE]?.message}
            InputProps={{
              inputProps: { pattern: '[0-9]*' },
              endAdornment: <InputAdornment position="end">₽</InputAdornment>,
            }}
            {...field}
          />
        )}
      />

      <Typography variant="subtitle1" color="secondary" sx={{ mt: 1 }}>
        Фото (от 1 до 10):
      </Typography>
      <Typography
        variant="inherit"
        color="secondary"
        sx={{ fontSize: 12, mb: 1 }}
      >
        Могут быть проблемы с браузером Safari, используйте Google Chrome
      </Typography>
      <Box sx={styles.imagesContainer}>
        {imageFiles.map((file) => (
          <UploadedImage
            key={file.name}
            file={file}
            onDelete={deleteImageHandler}
          />
        ))}
        <UploadedImage onAdd={addFileHandler} />
      </Box>
    </Popup>
  );
}

export default React.memo(AddItemPopup);
