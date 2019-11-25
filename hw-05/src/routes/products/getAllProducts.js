const Product = require('./productSchema');

const getAllProducts = async (request, response, next) => {
  try {
    const reqKeyWord = Object.keys(request.query)[0];

    if (request.path === '/' || request.path === '') {
      if (reqKeyWord === 'ids' || reqKeyWord === 'category' || reqKeyWord === 'token' || !reqKeyWord) {
        const foundProducts = await Product.find({}).populate('ingredients');
        response.status(200).json({
          status: "success",
          foundProducts
        });
      } else {
        next();
        return;
      }
    } else {
      next();
      return;
    }
  } catch (err) {
    response.status(404).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = getAllProducts;