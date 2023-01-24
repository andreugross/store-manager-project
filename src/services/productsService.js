const { productsModel } = require('../models/index');

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

const createProduct = async (name) => {
  const products = await productsModel.createProduct(name);
  if (!products) return false;
  return products;
};

const updateProduct = async (id, name) => {
  const products = await productsModel.updateProduct(id, name);
  if (!products) return false;
  return products;
};

const deleteProduct = async (id) => {
  const products = await productsModel.deleteProduct(id);
  if (!products) {
    return {
      error: { status: 204, message: 'Product not found' },
    };
  }
  return products;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
