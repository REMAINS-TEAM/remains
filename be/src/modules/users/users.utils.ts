import { SMSC_URL } from 'constants/main';

export const generateConfirmCallUrl = (phone: string) =>
  `${SMSC_URL}?login=${process.env.SMSC_LOGIN}&psw=${process.env.SMSC_PASSWORD}&phones=${phone}&mes=code&call=1&fmt=3`;
