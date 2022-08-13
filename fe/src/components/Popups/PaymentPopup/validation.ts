import Joi from 'joi';

export const paymentSchema = Joi.object({
  sum: Joi.number().positive().min(500).required(),
});
