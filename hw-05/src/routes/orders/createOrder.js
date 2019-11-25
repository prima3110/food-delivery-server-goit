const Order = require('./orderSchema');
const User = require('../users/userSchema');

const createOrder = async (request, response) => {
  try {
    const order = request.body;
    const newOrder = new Order(order);
    const CreatedOrder = await newOrder.save();

    const user = await User.findById(CreatedOrder.creator);
    const userOrders = user.orders;
    userOrders.push(CreatedOrder._id);

    await User.findOneAndUpdate({
      _id: CreatedOrder.creator
    }, {
      orders: userOrders
    }, {
      new: true
    });

    response.status(201).json({
      status: "success",
      CreatedOrder
    });
  } catch (err) {
    response.status(404).json({
      status: "error",
      message: err.message
    });
  }
}

module.exports = createOrder;