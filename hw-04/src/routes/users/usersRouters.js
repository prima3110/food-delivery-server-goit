const express = require('express');
const getUserById = require('./getUserById');
const updateUserById = require('./updateUserById');
const createUser = require('./createUser');
const deleteUserById = require('./deleteUserById');
const getAllUsers = require('./getAllUsers');


const router = express.Router();

router
    .get('/:id', getUserById)
    .put('/:id', updateUserById)
    .delete('/:id', deleteUserById)
    .get('/', getAllUsers)
    .post('/', createUser);

module.exports = router;