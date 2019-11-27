const Product = require('./productSchema');

const updateProductById = async (request, response) => {
  try {
    const product = request.body;
    const id = request.params.id;
    const updatedProduct = await Product.findOneAndUpdate({
        _id: id
      },
      product
    );
    response.status(200).json({
      status: 'success',
      updatedProduct
    });
  } catch (err) {
    response.status(404).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = updateProductById;