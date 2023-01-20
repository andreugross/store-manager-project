const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

const getProductsById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[products]] = await connection.execute(query, [id]);
  return products;
};

const createProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUE(?)';
  const [products] = await connection.execute(query, [name]);
  const newProduct = { id: products.insertId, name };
  return newProduct;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
};
