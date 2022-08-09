import React, { useState } from 'react';
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
import ConfirmPopup from 'components/Popups/ConfirmPopup';
import companiesApi from 'store/api/companies';
import useResponseNotifications from 'hooks/useResponseNotifications';

function EditProfilePopup({ open, setOpen }: RegisterPopupProps) {
  const [confirmCreateCompanyPopupOpen, setConfirmCreateCompanyPopupOpen] =
    useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [createNewCompanyRequest, createNewCompanyResult] =
    companiesApi.useCreateMutation();

  const user = useSelector(getCurrentUser);

  useResponseNotifications({
    result: createNewCompanyResult,
    onSuccessText: 'Компания создана',
    onErrorText: 'Ошибка при создании компании',
  });

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

  const createNewCompanyHandler = () => {
    createNewCompanyRequest({ name: newCompanyName, description: '' });
  };

  return (
    <>
      <Popup
        title={`Редактировать профиль`}
        onOkClick={handleSubmit(onSubmit)}
        closeWhenSubmit={false}
        {...{ open, setOpen }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={styles.generalContainer}>
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

            <AutocompleteField
              defaultValue={
                user?.company
                  ? { id: user?.company?.id, value: user?.company?.name }
                  : null
              }
              onCreate={(name) => {
                setNewCompanyName(name);
                setConfirmCreateCompanyPopupOpen(true);
              }}
              textFieldProps={{
                margin: 'dense',
                id: fields.company.NAME,
                label: 'Название компании или ИП',
                fullWidth: true,
                error: !!errors[fields.company.NAME],
                helperText: errors[fields.company.NAME]?.message,
              }}
            />
          </Box>
        </form>
      </Popup>
      <ConfirmPopup
        open={confirmCreateCompanyPopupOpen}
        setOpen={setConfirmCreateCompanyPopupOpen}
        onOkClick={createNewCompanyHandler}
        text={'Создать новую компанию?'}
      />
    </>
  );
}

export default React.memo(EditProfilePopup);
