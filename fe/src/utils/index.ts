import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const getQueryString = (
  obj: Record<string, any> | undefined | void,
): string => {
  if (!obj) return '';

  const queryString = Object.entries(obj)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      if (Array.isArray(value))
        return value
          .map((v) => `${encodeURIComponent(key)}[]=${encodeURIComponent(v)}`)
          .join('&');
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
  return queryString ? `?${queryString}` : '';
};

export const fileToDataUri = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event?.target?.result as string);
    };
    reader.readAsDataURL(file);
  });

export const onlyNumbers = (str: string) => str.replace(/[\D]+/g, '');

export const standardFormat = (
  date: string | number | Date | undefined,
  withTime = false,
) => {
  if (!date) return 'Неизв.дата';
  return format(new Date(date), `dd.MM.yyyy${withTime ? ' HH:mm' : ''}`, {
    locale: ru,
  });
};
