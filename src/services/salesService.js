const { salesModel } = require('../models');

const getAllSales = async () => salesModel.getAllSales();

const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);
  if (!sales) {
    return {
      error: { status: 404, message: 'Sales not found' },
    };
  }
  return sales;
};

module.exports = {
  getAllSales,
  getSalesById,
};
