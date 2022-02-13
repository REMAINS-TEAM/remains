import { useEffect } from 'react';

export default function ({
  name,
  value,
  setValue,
  maxLength,
}: {
  name: string;
  value: string;
  setValue: (name: any, value: string) => void;
  maxLength: number;
}) {
  useEffect(() => {
    if (value.length > maxLength) {
      setValue(name, value.substring(0, maxLength));
    }
  }, [value]);

  return value.length;
}
