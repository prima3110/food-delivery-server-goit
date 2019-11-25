const express = require('express');
const bodyParser = require('body-parser');
const corsMiddleware = require('cors');
const {
    port,
    secretKey,
    databaseUrl
} = require('./config');
const connectToDB = require('./src/db/connect-db');
const mainRoute = require('./src/routes/main/main');
const productsRouters = require('./src/routes/products/productsRouters');
const usersRouters = require('./src/routes/users/usersRouters');
const ordersRouters = require('./src/routes/orders/ordersRouters');
const authRouters = require('./src/routes/users/auth/authRouters');
const verifyToken = require('./src/routes/users/auth/checkTokenUser');
const commentsRouters = require('./src/routes/comments/commentsRouters');

const app = express();
connectToDB(databaseUrl);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.json()); //parse JSON
app.use(corsMiddleware()); //cross-domain query processing
app.use(verifyToken);

app.use('/auth', authRouters);
app.use('/comments', commentsRouters);
app.use('/products', productsRouters);
app.use('/users', usersRouters);
app.use('/orders', ordersRouters);
app.get('/', mainRoute);
app.use('*', (req, res, next) => {
    res.status(404).send('Page not found');
});


app.listen(port, () => {
    console.log('Server was started at http://localhost:' + port);
});