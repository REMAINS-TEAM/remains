import Joi from 'joi';

export const confirmCodeSchema = Joi.object({
  code: Joi.string().required().min(4).max(4),
});
