import { useEffect, useState } from 'react';

export default function (value: string, minLength = 3) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (value.length < minLength) return;
    const t = setTimeout(() => setDebouncedValue(value), 500);
    return () => clearTimeout(t);
  }, [value, minLength]);

  return debouncedValue;
}
