import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete, {
  AutocompleteProps,
  createFilterOptions,
} from '@mui/material/Autocomplete';
import { InputProps } from '@mui/material';
import { InputHTMLAttributes } from 'react';

interface OptionType {
  inputValue?: string;
  id?: number;
  value: string;
}

const filter = createFilterOptions<OptionType>();

export default function AutocompleteField({
  options,
  textFieldProps,
  inputProps,
  InputProps,
  onCreate,
  onSelect,
  defaultValue,
  ...rest
}: {
  options: OptionType[];
  onCreate: (value: string) => void;
  onSelect: ({ id, value }: { id: number; value: string }) => void;
  textFieldProps?: TextFieldProps;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  InputProps?: InputProps;
  defaultValue?: OptionType | null;
} & Partial<AutocompleteProps<any, any, any, any>>) {
  const [value, setValue] = React.useState<OptionType | null>(
    defaultValue || null,
  );

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          onCreate(newValue.inputValue);
          setValue({
            value: newValue.inputValue,
          });
        } else {
          setValue(newValue);
          onSelect(newValue);
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
      renderInput={(params) => (
        <TextField
          {...textFieldProps}
          {...params}
          inputProps={{ ...params.inputProps, ...inputProps }}
          InputProps={{ ...params.InputProps, ...InputProps }}
        />
      )}
    />
  );
}
