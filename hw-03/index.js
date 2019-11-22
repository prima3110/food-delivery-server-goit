const express = require('express');
const corsMiddleware = require('cors');
const {port} = require('./config');
const productsRouters = require('./src/routes/products/productsRouters');
const usersRouters = require('./src/routes/users/usersRouters');
const ordersRouters = require('./src/routes/orders/ordersRouters');

const app = express();

app.use(express.json()); //parse JSON
app.use(corsMiddleware()); //cross-domain query processing
app.use(productsRouters);
app.use(usersRouters);
app.use(ordersRouters);


app.listen(port);