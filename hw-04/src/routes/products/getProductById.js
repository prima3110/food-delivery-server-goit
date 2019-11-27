const Product = require('./productSchema');

const getProductById = async (request, response) => {
  try {
    const id = request.params.id;
    const foundProduct = await Product.findById(id);
    response.status(200).json(foundProduct);
  } catch (err) {
    response.status(204).json(err);
  }
};

module.exports = getProductById;