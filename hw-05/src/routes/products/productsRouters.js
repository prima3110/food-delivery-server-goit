const express = require('express');
const getProductById = require('./getProductById');
const updateProductById = require('./updateProductById');
const getProductsByIds = require('./getProductsByIds');
const getProductsByCategory = require('./getProductsByCategory');
const getAllProducts = require('./getAllProducts');
const createProduct = require('./createProduct');
const deleteProductById = require('./deleteProductById');

const router = express.Router();

router
    .get('/:id', getProductById)
    .put('/:id', updateProductById)
    .delete('/:id', deleteProductById)
    .post('/', createProduct)
    .get('/', getProductsByIds, getProductsByCategory, getAllProducts);

module.exports = router;