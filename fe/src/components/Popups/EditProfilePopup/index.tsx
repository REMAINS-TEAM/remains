import React from 'react';
import Popup from 'components/Popups/index';
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import useLimitTextField from 'hooks/useLimitTextField';
import useNotification from 'hooks/useNotification';
import { MAX_LENGTH_DESCRIPTION, MAX_LENGTH_NAME } from './validation';
import { RegisterPopupProps } from 'components/Popups/EditProfilePopup/types';
import { fields } from './fields';
import * as styles from './styles';
import {
  AlternateEmail as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'store/selectors/user';
import AutocompleteField from 'components/AutocompleteField';

function EditProfilePopup({ open, setOpen }: RegisterPopupProps) {
  const user = useSelector(getCurrentUser);
  const notification = useNotification();

  // useResponseNotifications({
  //   result,
  //   onSuccessText: 'Товар добавлен в выбранную категорию',
  //   onErrorText: 'Ошибка при добавлении товара',
  // });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    // resolver: joiResolver(editProfileSchema), //TODO
    defaultValues: {
      [fields.company.NAME]: user?.company?.name || '',
      [fields.company.DESCRIPTION]: user?.company?.description || '',
      [fields.user.NAME]: user?.name || '',
      [fields.user.PHONE]: user?.phone || '',
      [fields.user.EMAIL]: user?.email || '',
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

    setOpen(false);
  };

  return (
    <Popup
      title={`Редактировать профиль`}
      onOkClick={handleSubmit(onSubmit)}
      closeWhenSubmit={false}
      PaperProps={{ sx: styles.popup }}
      {...{ open, setOpen }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.generalContainer}>
          <Box sx={styles.dataContainer}>
            <Typography variant="subtitle1" color="secondary" sx={{ pb: 1.5 }}>
              Данные обо мне:
            </Typography>
            <Controller
              name={fields.user.NAME}
              control={control}
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  id={fields.user.NAME}
                  label="Имя"
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
                <MuiPhoneNumber
                  autoFocus
                  margin="dense"
                  id={fields.user.PHONE}
                  disabled={true}
                  label="Телефон"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultCountry={'ru'}
                  error={!!errors[fields.user.PHONE]}
                  helperText={errors[fields.user.PHONE]?.message}
                  InputProps={{
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
                  label="E-mail"
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
              Данные о моей компании:
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: 1,
              }}
            >
              <Controller
                name={fields.company.TYPE}
                control={control}
                render={({ field }) => (
                  <Select
                    margin="dense"
                    id={fields.company.TYPE}
                    variant="outlined"
                    sx={{ height: '56px', mt: 0.5 }}
                    defaultValue="IP"
                    {...field}
                  >
                    <MenuItem value={'IP'}>ИП</MenuItem>
                    <MenuItem value={'OOO'}>ООО</MenuItem>
                    <MenuItem value={'ZAO'}>ЗАО</MenuItem>
                    <MenuItem value={'OAO'}>ОАО</MenuItem>
                  </Select>
                )}
              />
              <Controller
                name={fields.company.NAME}
                control={control}
                render={({ field }) => (
                  <AutocompleteField
                    textFieldProps={{
                      margin: 'dense',
                      id: fields.company.NAME,
                      label: 'Название компании или ИП',
                      fullWidth: true,
                      error: !!errors[fields.company.NAME],
                      helperText: errors[fields.company.NAME]?.message,
                      ...field,
                    }}
                  />
                )}
              />
            </Box>
            <Controller
              name={fields.company.DESCRIPTION}
              control={control}
              render={({ field }) => (
                <TextField
                  margin="dense"
                  id={fields.company.DESCRIPTION}
                  label="Пара слов о компании (чем занимается, как давно...)"
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
      </form>
    </Popup>
  );
}

export default React.memo(EditProfilePopup);
