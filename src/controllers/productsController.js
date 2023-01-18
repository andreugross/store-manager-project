const productsService = require('../services/productsService');

const HTTP_STATUS_OK = 200;
const NOT_FOUND = 404;

const getAllProducts = async (_req, res) => {
  const products = await productsService.getAllProducts();

  res.status(HTTP_STATUS_OK).json(products);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;

  const products = await productsService.getProductsById(id);

  if (products.error) {
    return res.status(NOT_FOUND).json({ message: 'Product not found' });
  }
  return res.status(HTTP_STATUS_OK).json(products);
};

module.exports = {
  getAllProducts,
  getProductsById,
};
