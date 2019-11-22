const Product = require('./productSchema');

const getAllProducts = async (request, response, next) => {
  try {
    const reqKeyWord = Object.keys(request.query)[0];

    if (request.path === '/' || request.path === '') {
      if (reqKeyWord === 'ids' || reqKeyWord === 'category' || !reqKeyWord) {
        const foundProducts = await Product.find({});
        response.status(200).json(foundProducts);
      } else {
        next();
        return;
      }
    } else {
      next();
      return;
    }
  } catch (err) {
    response.status(500).json(err);
  }
};

module.exports = getAllProducts;