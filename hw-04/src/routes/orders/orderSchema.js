const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
const timestamp = require('../../db/middleware/timestamp');

const orderSchema = new Schema({
    creator: String,
    productsList: Array,
    deliveryType: String,
    deliveryAdress: String,
    sumToPay: Number,
    status: String
});

orderSchema.plugin(timestamp);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;