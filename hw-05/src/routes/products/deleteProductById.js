const Product = require('./productSchema');

const deleteProductById = async (request, response) => {
  try {
    const id = request.params.id;

    const deletedProduct = await Product.findById(id).remove();

    response.status(200).json({
      status: "success",
      deletedProduct: deletedProduct
    });
  } catch (err) {
    response.status(500).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = deleteProductById;