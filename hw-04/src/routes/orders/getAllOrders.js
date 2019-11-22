const Order = require('./orderSchema');

const getAllOrders = async (request, response) => {
    try {
        const allOrders = await Order.find({});
        response.status(200).json(allOrders);
    } catch (err) {
        response.status(500).json(err)
    };
};

module.exports = getAllOrders;