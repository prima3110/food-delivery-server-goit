const Order = require('./orderSchema');

const getAllOrders = async (request, response) => {
    try {
        const allOrders = await Order.find({});
        response.status(200).json({
            status: "success",
            allOrders
        });
    } catch (err) {
        response.status(404).json({
            status: "error",
            message: err.message
        });
    };
};

module.exports = getAllOrders;