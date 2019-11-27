const express = require('express');
const authLogin = require('./authLoginUser');
const authRegister = require('./authRegisterUser');
const authCurrent = require('./authCurrentUser');
const authLogout = require('./authLogoutUser');

const router = express.Router();

router
    .post('/login', authLogin)
    .post('/register', authRegister)
    .get('/current', authCurrent)
    .get('/logout', authLogout);

module.exports = router;