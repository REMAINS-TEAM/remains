import Joi from 'joi';
import { fields } from './fields';

export const MAX_LENGTH_NAME = 40;
export const MAX_LENGTH_DESCRIPTION = 200;

export const registerSchema = Joi.object({
  [fields.user.NAME]: Joi.string()
    .required()
    .min(3)
    .max(MAX_LENGTH_NAME)
    .messages({
      ['string.empty']: 'Заполните поле',
      ['any.required']: 'Заполните поле',
    }),
  [fields.user.PHONE]: Joi.string()
    .required()
    .messages({
      ['string.empty']: 'Заполните поле',
      ['any.required']: 'Заполните поле',
    }),
  [fields.user.EMAIL]: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .required()
    .messages({
      ['string.email']: 'Введите корректный e-mail',
    }),
  [fields.user.PASSWORD]: Joi.string()
    .required()
    .messages({
      ['string.empty']: 'Заполните поле',
      ['any.required']: 'Заполните поле',
    }),
  [fields.user.PASSWORD_CONFIRM]: Joi.string()
    .required()
    .messages({
      ['string.empty']: 'Заполните поле',
      ['any.required']: 'Заполните поле',
    }),
  [fields.company.NAME]: Joi.string()
    .required()
    .min(3)
    .max(MAX_LENGTH_NAME)
    .messages({
      ['string.empty']: 'Заполните поле',
      ['any.required']: 'Заполните поле',
    }),
  [fields.company.DESCRIPTION]: Joi.string()
    .optional()
    .allow('')
    .min(10)
    .max(MAX_LENGTH_DESCRIPTION)
    .messages({
      ['string.empty']: 'Заполните поле',
      ['any.required']: 'Заполните поле',
    }),
});
