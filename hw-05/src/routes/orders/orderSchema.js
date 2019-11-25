const mongoose = require('mongoose');
const {
  Schema
} = mongoose;
const timestamp = require('../../db/middleware/timestamp');

const subProductsList = new Schema({
  product: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  itemsCount: {
    type: Number,
    required: true
  }
}, {
  _id: false
});

const orderSchema = new Schema({
  creator: {
    type: String,
    required: true
  },
  productsList: {
    type: [subProductsList],
    required: true,
  },
  deliveryType: {
    type: String,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  sumToPay: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

orderSchema.plugin(timestamp);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;