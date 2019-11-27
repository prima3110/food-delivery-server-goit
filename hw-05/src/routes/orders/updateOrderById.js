const Order = require('./orderSchema');

const updateOrderById = async (request, response) => {
    try {
        const order = request.body;
        const id = request.params.id;
        const updatedOrder = await Order.findOneAndUpdate({
            _id: id
        }, order);
        response.status(200).json({
            status: 'success',
            updatedOrder
        });
    } catch (err) {
        response.status(404).json({
            status: "error",
            message: err.message
        });
    };
};

module.exports = updateOrderById;