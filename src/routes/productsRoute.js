const express = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = express.Router();

productsRoute.get('/products', productsController.getAllProducts);

productsRoute.get('/products/:id', productsController.getProductsById);

module.exports = productsRoute;
