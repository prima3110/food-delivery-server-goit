const Order = require('./orderSchema');

const getOrderById = async (request, response) => {
  try {
    const id = request.params.id;
    const foundOrder = await Order.findById(id);
    response.status(200).json({
      status: 'success',
      foundOrder
    });
  } catch (err) {
    response.status(404).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = getOrderById;