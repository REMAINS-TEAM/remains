import Joi from 'joi';

export const MAX_LENGTH_NAME = 40;
export const MAX_LENGTH_DESCRIPTION = 200;

export const editProfileSchema = Joi.object({
  'user.name': Joi.string()
    .required()
    .min(3)
    .max(MAX_LENGTH_NAME)
    .messages({
      ['string.empty']: 'Заполните поле',
      ['any.required']: 'Заполните поле',
    }),
  'user.phone': Joi.string().required(),
  'user.email': Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .required()
    .messages({
      ['string.email']: 'Введите корректный e-mail',
    }),
  'company.name': Joi.string()
    .required()
    .min(3)
    .max(MAX_LENGTH_NAME)
    .messages({
      ['string.empty']: 'Заполните поле',
      ['any.required']: 'Заполните поле',
    }),
});
