const joi = require('joi');

const schema = {
  createSale: joi.object({
    productId: joi.number().required().messages({
      'any.required': '"productId" is required',
    }),
    quantity: joi.number().min(1).required().messages({
      'number.min': '"quantity" must be greater than or equal to 1',
      'any.required': '"quantity" is required',
    }),
  }),
};

module.exports = schema;
