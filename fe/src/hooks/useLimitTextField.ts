import { useEffect } from 'react';

export default function ({
  value,
  setValue,
  maxLength,
}: {
  value: string;
  setValue: (value: string) => void;
  maxLength: number;
}) {
  useEffect(() => {
    if (value.length > maxLength) {
      setValue(value.substring(0, maxLength));
    }
  }, [value]);

  return value.length;
}
