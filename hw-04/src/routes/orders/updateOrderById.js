const Order = require('./orderSchema');

const updateOrderById = async (request, response) => {
    try {
        const order = request.body;
        const id = request.params.id;
        const updatedOrder = await Order.findOneAndUpdate({
            _id: id
        }, order);
        response.status(200).json(updatedOrder);
    } catch (err) {
        response.status(500).json(err)
    };
};

module.exports = updateOrderById;