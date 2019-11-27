const Product = require('./productSchema');

const getProductsByCategory = async (request, response, next) => {
  try {
    const reqField = Object.keys(request.query)[0];

    if (reqField !== 'category') {
      next();
      return;
    }

    const reqKeyWord = request.query.category.slice(1, -1);
    const foundProducts = await Product.find({
      categories: reqKeyWord
    }).populate('ingredients');
    response.status(200).json({
      status: 'success',
      foundProducts
    });
  } catch (err) {
    response.status(404).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = getProductsByCategory;