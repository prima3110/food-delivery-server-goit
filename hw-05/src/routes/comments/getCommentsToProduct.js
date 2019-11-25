const Comment = require('./commentSchema');

const getCommentsToProduct = async (request, response) => {
  try {
    const productId = request.params.product;
    const foundComments = await Comment.find({
      product: productId
    });
    response.status(200).json({
      status: 'success',
      foundComments
    });
  } catch (err) {
    response.status(500).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = getCommentsToProduct;