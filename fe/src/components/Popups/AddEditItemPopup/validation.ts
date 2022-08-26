import Joi from 'joi';

export const MAX_LENGTH_TITLE = 80;
export const MAX_LENGTH_DESCRIPTION = 100;

export const AddItemSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(3)
    .max(MAX_LENGTH_TITLE)
    .message('Длина поля должна быть 3-80 символов')
    .custom((value, helper) => {
      if (value.replace(/\D+/g, '').length > 7) {
        return helper.message({ custom: 'Заголовок содержит много цифр' });
      }
      return value;
    }),

  description: Joi.string()
    .required()
    .min(10)
    .max(MAX_LENGTH_DESCRIPTION)
    .message('Длина поля должна быть 10-100 символов'),
  price: Joi.number()
    .required()
    .positive()
    .less(9_999_999)
    .message('Введите корректную цену'),
});
