const Product = require('./productSchema');
const ingredients = require('../ingredients/ingredientsSchema');

const getProductById = async (request, response) => {
  try {
    const id = request.params.id;
    const foundProduct = await Product.findById(id).populate("ingredients");
    response.status(200).json({
      status: 'success',
      foundProduct
    });
  } catch (err) {
    response.status(404).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = getProductById;