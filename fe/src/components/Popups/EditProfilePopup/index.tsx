import React, { useEffect, useState } from 'react';
import Popup from 'components/Popups/index';
import { Box, InputAdornment, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import useLimitTextField from 'hooks/useLimitTextField';
import { MAX_LENGTH_NAME } from './validation';
import { RegisterPopupProps } from 'components/Popups/EditProfilePopup/types';
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

  const { data: companies, isFetching } =
    companiesApi.useGetAllCompaniesQuery();

  const [createNewCompanyRequest, createNewCompanyResult] =
    companiesApi.useCreateCompanyMutation();

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
      company: { id: 0, name: user?.company?.name || '' },
      user: {
        name: user?.name || '',
        phone: user?.phone || '',
        email: user?.email || '',
      },
    },
  });

  useEffect(() => {
    if (!createNewCompanyResult) return;
    setValue('company', {
      id: createNewCompanyResult.data?.id || 0,
      name: createNewCompanyResult.data?.name || '',
    });
  }, [createNewCompanyResult]);

  const userNameLength = useLimitTextField({
    value: watch('user.name'),
    setValue: (value) => setValue('user.name', value),
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
              name={'user.name'}
              control={control}
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  id={'user.name'}
                  label="Имя"
                  type="text"
                  fullWidth
                  variant="outlined"
                  error={!!errors?.user?.name}
                  helperText={errors?.user?.name}
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
              name={'user.phone'}
              control={control}
              render={({ field }) => (
                <MuiPhoneNumber
                  autoFocus
                  margin="dense"
                  id={'user.phone'}
                  disabled={true}
                  label="Телефон"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultCountry={'ru'}
                  error={!!errors?.user?.phone}
                  helperText={errors?.user?.phone}
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
              name={'user.email'}
              control={control}
              render={({ field }) => (
                <TextField
                  margin="dense"
                  id={'user.email'}
                  label="E-mail"
                  type="text"
                  fullWidth
                  variant="outlined"
                  error={!!errors?.user?.email}
                  helperText={errors?.user?.email}
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
              options={
                companies?.length
                  ? companies.map(({ id, name }) => ({
                      id,
                      value: name,
                    }))
                  : []
              }
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
                id: 'company.name',
                label: 'Название компании или ИП',
                fullWidth: true,
                error: !!errors?.company?.name,
                helperText: errors?.company?.name,
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
