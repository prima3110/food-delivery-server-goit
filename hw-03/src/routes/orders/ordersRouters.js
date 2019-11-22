const express = require('express');
const controller = require('./ordersControllers');

const router = express.Router();

router.post('/orders', controller.postOrder);

module.exports = router;