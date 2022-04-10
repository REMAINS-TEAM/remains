import { IMaskInput } from 'react-imask';
import React from 'react';
import { TextMaskInputProps } from './types';

const TextMaskInput = React.forwardRef<HTMLElement, TextMaskInputProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...rest } = props;
    return (
      <IMaskInput
        mask="(#00) 000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        {...rest}
        inputRef={ref as any}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  },
);

export default TextMaskInput;
