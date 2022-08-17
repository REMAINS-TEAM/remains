export const MAX_ITEMS_FOR_NOT_REGISTERED_USER = 5;
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const MIME_IMAGES_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
} as Record<string, string>;
export const SMSC_URL = 'https://smsc.ru/sys/send.php';
export const NOT_ACTIVATED_LIMIT = 24 * 60 * 60 * 1000;
