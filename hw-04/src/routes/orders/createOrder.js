const Order = require('./orderSchema');

const createOrder = async (request, response) => {
  try {
    const order = request.body;
    const newOrder = new Order(order);
    const CreatedOrder = await newOrder.save();
    response.status(201).json(CreatedOrder);
  } catch (err) {
    response.status(500).json(err);
  }
}

module.exports = createOrder;