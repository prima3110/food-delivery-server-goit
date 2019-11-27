const express = require('express');
const getOrderById = require('./getOrderById');
const createOrder = require('./createOrder');
const updateOrderById = require('./updateOrderById');
const getAllOrders = require('./getAllOrders');
const deleteOrderById = require('./deleteOrderById');

const router = express.Router();

router
    .get('/:id', getOrderById)
    .put('/:id', updateOrderById)
    .delete('/:id', deleteOrderById)
    .get('/', getAllOrders)
    .post('/', createOrder);

module.exports = router;