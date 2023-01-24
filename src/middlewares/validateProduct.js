const salesValidation = require('../validations/salesvalidation');

const validateProduct = (req, _res, next) => {
  const sales = req.body;
  const result = sales.map((sale) => salesValidation.createSale.validate(sale));
let validSales = [...result];
result.forEach((sale) => {
  if (sale.error) {
    validSales = { message: sale.error.details[0].message };
  }
});

return validSales.message ? next(validSales) : next();
};

module.exports = {
  validateProduct,
};
