import Joi from 'joi';
import { fields } from './fields';

export const MAX_LENGTH_NAME = 40;
export const MAX_LENGTH_DESCRIPTION = 200;

export const registerSchema = Joi.object({
  [`company.${fields.company.NAME}`]: Joi.string()
    .required()
    .min(3)
    .max(MAX_LENGTH_NAME)
    .message(`Длина поля должна быть 3-${MAX_LENGTH_NAME} символов`), //TODO: not work
  [`company.${fields.company.DESCRIPTION}`]: Joi.string()
    .required()
    .min(10)
    .max(MAX_LENGTH_DESCRIPTION)
    .message(`Длина поля должна быть 10-${MAX_LENGTH_DESCRIPTION} символов`),
});
