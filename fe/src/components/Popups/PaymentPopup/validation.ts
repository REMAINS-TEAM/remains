import Joi from 'joi';

export const paymentSchema = Joi.object({
  amount: Joi.number().positive().min(500).required(),
});
