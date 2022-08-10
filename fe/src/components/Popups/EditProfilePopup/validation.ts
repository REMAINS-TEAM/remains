import Joi from 'joi';

export const MAX_LENGTH_NAME = 40;
export const MAX_LENGTH_DESCRIPTION = 200;

export const editProfileSchema = Joi.object({
  user: Joi.object({
    name: Joi.string().required().min(3).max(MAX_LENGTH_NAME).messages({
      'string.empty': 'Заполните поле',
      'any.required': 'Заполните поле',
    }),
    phone: Joi.string().required(),
    email: Joi.string()
      .optional()
      .allow('')
      .email({ tlds: { allow: false } })
      .lowercase()
      .messages({
        'string.email': 'Введите корректный e-mail',
      }),
  }),
  company: Joi.object({
    id: Joi.number().optional(),
    name: Joi.string().optional().min(3).max(MAX_LENGTH_NAME).messages({
      'string.empty': 'Заполните поле',
      'any.required': 'Заполните поле',
    }),
  }),
});
