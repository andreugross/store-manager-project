const express = require('express');
const { productsController } = require('../controllers/index');

const productsRoute = express.Router();

productsRoute.get('/products', productsController.getAllProducts);

productsRoute.get('/products/:id', productsController.getProductsById);

module.exports = productsRoute;
