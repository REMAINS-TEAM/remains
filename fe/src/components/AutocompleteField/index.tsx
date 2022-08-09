import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete, {
  AutocompleteProps,
  createFilterOptions,
} from '@mui/material/Autocomplete';

const filter = createFilterOptions<OptionType>();

export default function AutocompleteField({
  textFieldProps,
  onCreate,
  defaultValue,
  ...rest
}: {
  onCreate: (value: string) => void;
  textFieldProps?: TextFieldProps;
  defaultValue?: OptionType | null;
} & Partial<AutocompleteProps<any, any, any, any>>) {
  const [value, setValue] = React.useState<OptionType | null>(
    defaultValue || null,
  );

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            value: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          onCreate(newValue.inputValue);
          setValue({
            value: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      {...rest}
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
            value: `Создать "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={options}
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
        return option.value;
      }}
      renderOption={(props, option) => <li {...props}>{option.value}</li>}
      freeSolo
      sx={{ width: '100%' }}
      renderInput={(params) => <TextField {...textFieldProps} {...params} />}
    />
  );
}

interface OptionType {
  inputValue?: string;
  id?: number;
  value: string;
}

const options: readonly OptionType[] = [
  { id: 1, value: 'Рога и копыта' },
  { id: 2, value: 'test1' },
  { id: 3, value: 'test2' },
  { id: 4, value: 'test23' },
];
