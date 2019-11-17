const express = require('express');
const mainRoute = require('../main/main');
const controller = require('./productsControllers');

const router = express.Router();

router
    .get('/products/:id', controller.getProductById)
    .get('/products/', controller.getProductsByIds, controller.getProductsByCategory, controller.getProducts)
    .get('/', mainRoute);

module.exports = router;