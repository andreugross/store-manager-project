const express = require('express');
const { productsController } = require('../controllers/index');
const { validateName } = require('../middlewares/validateName');

const productsRoute = express.Router();

productsRoute.get('/products', productsController.getAllProducts);

productsRoute.get('/products/:id', productsController.getProductsById);

productsRoute.post('/products', validateName, productsController.createProduct);

productsRoute.put('/products/:id', validateName, productsController.updateProduct);

productsRoute.delete('/products/:id', productsController.deleteProduct);

module.exports = productsRoute;
