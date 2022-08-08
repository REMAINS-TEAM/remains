import Joi from 'joi';

export const MAX_LENGTH_TITLE = 80;
export const MAX_LENGTH_DESCRIPTION = 200;

export const AddItemSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(3)
    .max(MAX_LENGTH_TITLE)
    .message('Длина поля должна быть 3-80 символов'), //TODO: not work
  description: Joi.string()
    .required()
    .min(10)
    .max(MAX_LENGTH_DESCRIPTION)
    .message('Длина поля должна быть 10-200 символов'),
  price: Joi.number()
    .required()
    .positive()
    .less(1_000_000)
    .message('Введите корректную цену'),
});
