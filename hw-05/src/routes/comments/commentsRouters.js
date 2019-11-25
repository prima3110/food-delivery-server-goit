const express = require('express');
const getCommentsToProduct = require('./getCommentsToProduct');
const createComment = require('./createComment');

const router = express.Router();

router
    .get('/:product', getCommentsToProduct)
    .post('/', createComment);

module.exports = router;