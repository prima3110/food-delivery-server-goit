const Product = require('./productSchema');

const createProduct = async (request, response) => {
  try {
    const product = request.body;
    const notUniqueProduct = await Product.findOne({
      name: request.body.name
    });
    if (notUniqueProduct) {
      return response.status(400).send("Product already exists.")
    };
    const newProduct = await new Product(product);
    const createdProduct = await newProduct.save();
    response.status(201).json({
      status: "success",
      createdProduct
    });
  } catch (err) {
    response.status(500).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = createProduct;