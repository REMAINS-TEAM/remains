import React from 'react';
import Popup from 'components/Popups/index';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import useLimitTextField from 'hooks/useLimitTextField';
import itemsApi from 'store/api/items';
import useResponseNotifications from 'hooks/useResponseNotifications';
import useNotification from 'hooks/useNotification';
import {
  MAX_LENGTH_DESCRIPTION,
  MAX_LENGTH_NAME,
  registerSchema,
} from './validation';
import { RegisterPopupProps } from 'components/Popups/RegisterPopup/types';
import { fields } from './fields';
import * as styles from './styles';
import {
  Phone as PhoneIcon,
  AlternateEmail as EmailIcon,
  VpnKey as PasswordIcon,
} from '@mui/icons-material';

import TextMaskInput from 'components/TextMaskInput';

const PhoneMask = (props: any) => (
  <TextMaskInput {...{ ...props, mask: '+# (#00) 000-00-00' }} />
);

function RegisterPopup({ open, setOpen }: RegisterPopupProps) {
  const [createItemRequest, result] = itemsApi.useCreateItemMutation();

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
  } = useForm({
    resolver: joiResolver(registerSchema),
    defaultValues: {
      [fields.company.NAME]: '',
      [fields.company.DESCRIPTION]: '',
      [fields.user.NAME]: '',
      [fields.user.PHONE]: '',
      [fields.user.EMAIL]: '',
    },
  });

  console.log('errors', errors);

  const companyNameLength = useLimitTextField({
    value: watch(fields.company.NAME),
    setValue: (value) => setValue(fields.company.NAME, value),
    maxLength: MAX_LENGTH_NAME,
  });

  const companyDescriptionLength = useLimitTextField({
    value: watch(fields.company.DESCRIPTION),
    setValue: (value) => setValue(fields.company.DESCRIPTION, value),
    maxLength: MAX_LENGTH_DESCRIPTION,
  });

  const userNameLength = useLimitTextField({
    value: watch(fields.user.NAME),
    setValue: (value) => setValue(fields.user.NAME, value),
    maxLength: MAX_LENGTH_NAME,
  });

  const onSubmit = (fieldsValues: Record<string, string>) => {
    if (Object.keys(errors).length) return;

    console.log(fieldsValues);

    const formData = new FormData();
    //
    // formData.append('categoryId', String(category.id));
    // Object.entries(fieldsValues).forEach(([key, value]) =>
    //   formData.append(key, value),
    // );
    //
    // createItemRequest(formData);
    setOpen(false);
  };

  return (
    <Popup
      title={`Регистрация`}
      okButtonText={'Зарегистрироваться'}
      onOkClick={handleSubmit(onSubmit)}
      closeWhenSubmit={false}
      PaperProps={{ sx: styles.popup }}
      {...{ open, setOpen }}
    >
      <Box sx={styles.generalContainer}>
        <Box sx={styles.dataContainer}>
          <Typography variant="subtitle1" color="secondary" sx={{ pb: 1.5 }}>
            Данные о Вас:
          </Typography>
          <Controller
            name={fields.user.NAME}
            control={control}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id={fields.user.NAME}
                label="Ваше имя"
                type="text"
                fullWidth
                variant="outlined"
                error={!!errors[fields.user.NAME]}
                helperText={errors[fields.user.NAME]?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={
                        MAX_LENGTH_NAME - userNameLength <= 0
                          ? { color: 'red' }
                          : null
                      }
                    >
                      {MAX_LENGTH_NAME - userNameLength}
                    </InputAdornment>
                  ),
                }}
                {...field}
              />
            )}
          />
          <Controller
            name={fields.user.PHONE}
            control={control}
            render={({ field }) => (
              <TextField
                margin="dense"
                id={fields.user.PHONE}
                label="Ваш тел."
                type="text"
                fullWidth
                variant="outlined"
                error={!!errors[fields.user.PHONE]}
                helperText={errors[fields.user.PHONE]?.message}
                InputProps={{
                  inputComponent: PhoneMask as any,
                  endAdornment: (
                    <InputAdornment position="end">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
                {...field}
              />
            )}
          />
          <Controller
            name={fields.user.EMAIL}
            control={control}
            render={({ field }) => (
              <TextField
                margin="dense"
                id={fields.user.EMAIL}
                label="Ваш e-mail"
                type="text"
                fullWidth
                variant="outlined"
                error={!!errors[fields.user.EMAIL]}
                helperText={errors[fields.user.EMAIL]?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                {...field}
              />
            )}
          />
        </Box>
        <Box sx={styles.dataContainer}>
          <Typography variant="subtitle1" color="secondary" sx={{ pb: 1.5 }}>
            Данные о вашей компании:
          </Typography>
          <Controller
            name={fields.company.NAME}
            control={control}
            render={({ field }) => (
              <TextField
                margin="dense"
                id={fields.company.NAME}
                label="Название компании или ИП"
                type="text"
                fullWidth
                variant="outlined"
                error={!!errors[fields.company.NAME]}
                helperText={errors[fields.company.NAME]?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={
                        MAX_LENGTH_NAME - companyNameLength <= 0
                          ? { color: 'red' }
                          : null
                      }
                    >
                      {MAX_LENGTH_NAME - companyNameLength}
                    </InputAdornment>
                  ),
                }}
                {...field}
              />
            )}
          />
          <Controller
            name={fields.company.DESCRIPTION}
            control={control}
            render={({ field }) => (
              <TextField
                margin="dense"
                id={fields.company.DESCRIPTION}
                label="Пара слов о компании (чем занимается, как давно на рынке и т.п.)"
                type="text"
                multiline
                fullWidth
                variant="outlined"
                rows={4}
                error={!!errors[fields.company.DESCRIPTION]}
                helperText={errors[fields.company.DESCRIPTION]?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={
                        MAX_LENGTH_DESCRIPTION - companyDescriptionLength <= 0
                          ? { color: 'red' }
                          : null
                      }
                    >
                      {MAX_LENGTH_DESCRIPTION - companyDescriptionLength}
                    </InputAdornment>
                  ),
                }}
                {...field}
              />
            )}
          />
        </Box>
      </Box>
      <Typography variant="subtitle1" color="secondary" sx={{ py: 1.5 }}>
        Пароль:
      </Typography>
      <Box sx={styles.generalContainer}>
        <Box sx={styles.dataContainer}>
          <Controller
            name={fields.user.PASSWORD}
            control={control}
            render={({ field }) => (
              <TextField
                margin="dense"
                id={fields.user.PASSWORD}
                label="Придумайте пароль"
                type="password"
                variant="outlined"
                error={!!errors[fields.user.PASSWORD]}
                helperText={errors[fields.user.PASSWORD]?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
                {...field}
              />
            )}
          />
        </Box>
        <Box sx={styles.dataContainer}>
          <Controller
            name={fields.user.PASSWORD_CONFIRM}
            control={control}
            render={({ field }) => (
              <TextField
                margin="dense"
                id={fields.user.PASSWORD_CONFIRM}
                label="Подтвердите пароль"
                type="password"
                variant="outlined"
                error={!!errors[fields.user.PASSWORD_CONFIRM]}
                helperText={errors[fields.user.PASSWORD_CONFIRM]?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
                {...field}
              />
            )}
          />
        </Box>
      </Box>
    </Popup>
  );
}

export default React.memo(RegisterPopup);
