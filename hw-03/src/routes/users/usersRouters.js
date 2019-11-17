const express = require('express');
const controller = require('./usersControllers');

const router = express.Router();

router
    .get('/users/:id', controller.getUserById)
    .get('/users', controller.getAllUsers)
    .post('/users', controller.postUser)
    .get('*', (req, res, next) => {
        res.status(404).send('Page not found');
    });

module.exports = router;