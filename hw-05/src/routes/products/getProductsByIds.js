const Product = require('./productSchema');

const getProductsByIds = async (request, response, next) => {
  try {
    const reqKeyWord = Object.keys(request.query)[0];

    if (reqKeyWord !== 'ids') {
      next();
      return;
    }

    const foundProducts = await Product.find({}).populate('ingredients');
    const filteredProductsById = foundProducts.filter(el => request.query.ids.includes(el._id));
    response.status(200).json({
      status: 'success',
      filteredProductsById
    });
  } catch (err) {
    response.status(404).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = getProductsByIds;