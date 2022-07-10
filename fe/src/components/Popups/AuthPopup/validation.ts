import Joi from 'joi';

export const authSchema = Joi.object({
  phone: Joi.string().required().min(18).max(22),
});
