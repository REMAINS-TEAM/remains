import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions<FilmOptionType>();

export default function AutocompleteField({
  textFieldProps,
}: {
  textFieldProps?: TextFieldProps;
}) {
  const [value, setValue] = React.useState<FilmOptionType | null>(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === option.title,
        );
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Создать "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={top100Films}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      freeSolo
      sx={{ width: '100%' }}
      renderInput={(params) => <TextField {...textFieldProps} {...params} />}
    />
  );
}

interface FilmOptionType {
  inputValue?: string;
  title: string;
  year?: number;
}

const top100Films: readonly FilmOptionType[] = [
  { title: 'Рога и копыта', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
];
