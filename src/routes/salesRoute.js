const express = require('express');
const { salesController } = require('../controllers');

const salesRoute = express.Router();

salesRoute.get('/sales', salesController.getAllSales);

salesRoute.get('/sales/:id', salesController.getSalesById);

module.exports = salesRoute;
