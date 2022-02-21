import Joi from 'joi';

export const MAX_LENGTH_TITLE = 80;
export const MAX_LENGTH_DESCRIPTION = 200;

export const AddIitemSchema = Joi.object({
  title: Joi.string().required().min(3).max(MAX_LENGTH_TITLE),
  description: Joi.string().required().min(10).max(MAX_LENGTH_DESCRIPTION),
  price: Joi.string().required().min(1).max(10),
});
