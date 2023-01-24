const { salesService } = require('../services');

const HTTP_STATUS_OK = 200;
const NOT_FOUND = 404;

const getAllSales = async (_req, res) => {
  const sales = await salesService.getAllSales();
  return res.status(HTTP_STATUS_OK).json(sales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.getSalesById(id);
  if (sales.error) {
    return res.status(NOT_FOUND).json({ message: 'Sale not found' });
  }
  return res.status(HTTP_STATUS_OK).json(sales);
};

module.exports = {
  getAllSales,
  getSalesById,
};
