import { SMSC_URL } from 'constants/main';

export const generateConfirmCallUrl = (phone: string) =>
  `${SMSC_URL}?login=${process.env.SMSC_LOGIN}&psw=${process.env.SMSC_PASSWORD}&phones=${phone}&mes=code&call=1&fmt=3`;

export const generateMessageCallUrl = (phone: string, msg: string) =>
  `${SMSC_URL}?login=${process.env.SMSC_LOGIN}&psw=${
    process.env.SMSC_PASSWORD
  }&phones=${phone}&call=1&mes=${encodeURIComponent(msg)}&fmt=3`;

export const getRandomInteger = (min: number, max: number) => {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};
