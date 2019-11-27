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
    });
    response.status(200).json(foundProducts);
  } catch (err) {
    response.status(400).json(err);
  }
};

module.exports = getProductsByCategory;