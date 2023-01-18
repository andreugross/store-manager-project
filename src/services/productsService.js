const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getProductsById = async (id) => {
  const products = await productsModel.getProductsById(id);

  if (!products) {
    return {
      error: {
        status: 404,
        message: 'Product not found',
      },
    };
  }
  return products;
};

module.exports = {
  getAllProducts,
  getProductsById,
};
