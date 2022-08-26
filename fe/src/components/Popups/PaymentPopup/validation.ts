import Joi from 'joi';
import { MAX_PRICE, MIN_PRICE } from 'components/Popups/PaymentPopup/constants';

export const paymentSchema = Joi.object({
  amount: Joi.number().positive().min(MIN_PRICE).max(MAX_PRICE).required(),
});
