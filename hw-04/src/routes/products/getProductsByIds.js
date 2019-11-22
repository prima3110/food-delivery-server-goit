const Product = require('./productSchema');

const getProductsByIds = async (request, response, next) => {
  try {
  const reqKeyWord = Object.keys(request.query)[0];

  if (reqKeyWord !== 'ids') {
    next();
    return;
  }

    const foundProducts = await Product.find({});
    const filteredProductsById = foundProducts.filter(el => request.query.ids.includes(el._id));
    response.status(200).json(filteredProductsById);
  } catch (err) {
    response.status(400).json(err);
  }
};

module.exports = getProductsByIds;