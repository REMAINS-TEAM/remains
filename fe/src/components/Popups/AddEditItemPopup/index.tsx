import React, { useEffect, useState } from 'react';
import Popup from 'components/Popups/index';
import { AddEditItemPopupProps } from 'components/Popups/AddEditItemPopup/types';
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
import { getIsAdmin, getPaidStatus } from 'store/selectors/user';
import NotificationPlate from 'components/NotificationPlate';
import { QueryStatus } from '@reduxjs/toolkit/query';

const fields = {
  TITLE: 'title',
  DESCRIPTION: 'description',
  PRICE: 'price',
};

type FieldsType = typeof fields[keyof typeof fields];

function AddEditItemPopup({
  open,
  setOpen,
  category,
  itemId,
  onAdd,
  onEdit,
}: AddEditItemPopupProps) {
  const isPaid = useSelector(getPaidStatus);
  const isAdmin = useSelector(getIsAdmin);

  const { data: item } = itemsApi.useGetItemByIdQuery(itemId || 0, {
    skip: !itemId || !open,
  });

  const [createItemRequest, createItemResult] =
    itemsApi.useCreateItemMutation();
  const [updateItemRequest, updateItemResult] =
    itemsApi.useUpdateItemMutation();

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagesSrc, setImagesSrc] = useState<string[]>([]);

  const notification = useNotification();

  useResponseNotifications({
    result: !itemId ? createItemResult : updateItemResult,
    onSuccessText: !itemId
      ? 'Товар добавлен в выбранную категорию'
      : 'Товар изменен',
    onErrorText: `Ошибка при ${
      !itemId ? 'добавлении' : 'редактировании'
    } товара`,
  });

  useEffect(() => {
    if (createItemResult?.status === QueryStatus.fulfilled && onAdd) {
      onAdd(createItemResult.data);
    }

    if (updateItemResult?.status === QueryStatus.fulfilled && onEdit) {
      onEdit(updateItemResult.data);
    }
  }, [createItemResult, updateItemResult]);

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

  useEffect(() => {
    if (!item) return;
    reset({
      [fields.TITLE]: item.title,
      [fields.DESCRIPTION]: item.description,
      [fields.PRICE]: item.price,
    } as Record<FieldsType, string>);
    setImagesSrc(
      item.images.map((fileName) => `/api/storage/items/${itemId}/${fileName}`),
    );
  }, [item]);

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

  if (!category && !itemId) return null;

  const onSubmit = (fieldsValues: Record<FieldsType, string>) => {
    if (Object.keys(errors).length) return;
    if (!imageFiles.length && !imagesSrc.length) {
      notification.show(
        notificationType.ERROR,
        'Добавьте хотя бы одно изображение',
      );
      return;
    }

    const formData = new FormData();

    Object.entries(fieldsValues).forEach(([key, value]) =>
      formData.append(key, value),
    );
    imageFiles.forEach((file) => formData.append('images', file, file.name));

    if (!itemId) {
      formData.append('categoryId', String(category?.id || ''));
      createItemRequest(formData);
    } else {
      const restImageNames = imagesSrc.map((src) => src.split('/').pop());
      const deletedImageNames =
        item?.images.filter(
          (oldImageName) => !restImageNames.includes(oldImageName),
        ) || [];
      deletedImageNames.forEach((fileName) =>
        formData.append('deletedImageNames', fileName),
      );
      if (deletedImageNames.length === 1)
        formData.append('deletedImageNames', ''); // because it should be an array
      updateItemRequest({ id: itemId, formData });
    }

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

  const deleteImageHandler = (file: File | string) => {
    if (typeof file === 'string') {
      setImagesSrc((prev) => prev.filter((src) => src !== file));
    } else {
      setImageFiles((prev) =>
        prev.filter((f) => f.name !== file.name && f.size !== file.size),
      );
    }
  };

  return (
    <Popup
      title={
        !itemId
          ? `Разместить товар в категории "${category?.title || ''}"`
          : `Редактировать ${item?.title || ''}`
      }
      okButtonText={!itemId ? 'Разместить' : 'Применить'}
      onOkClick={handleSubmit(onSubmit)}
      okButtonProps={{ disabled: !isPaid && !isAdmin }}
      onClose={resetForm}
      closeWhenSubmit={false}
      {...{ open, setOpen }}
    >
      {!isPaid && !isAdmin && (
        <NotificationPlate
          title={`Оплатите сервис для ${
            !itemId ? 'добавления' : 'изменения'
          } товара`}
          color="error"
          sx={{ mb: 2 }}
        />
      )}
      {(isPaid || isAdmin) && (
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
        {itemId &&
          imagesSrc.map((src) => (
            <UploadedImage key={src} src={src} onDelete={deleteImageHandler} />
          ))}
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

export default React.memo(AddEditItemPopup);
