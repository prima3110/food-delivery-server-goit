const Order = require('../orders/orderSchema');

const deleteOrderById = async (request, response) => {
  try {
    const id = request.params.id;

    const deletedOrder = await Order.findById(id).remove();

    response.status(200).json({
      status: "success",
      deletedOrder: deletedOrder
    });
  } catch (err) {
    response.status(404).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = deleteOrderById;