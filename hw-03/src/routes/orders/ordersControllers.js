const fs = require("fs");
const path = require("path");
const allProducts = require("../../db/products/all-products.json");
const allUsers = require("../../db/users/all-users.json");
const filePath = path.join(__dirname, "../..", "db/", "users/", "orders.json");

const postOrder = (req, res, next) => {
  const arr = [];
  const {
    deliveryType,
    deliveryAdress
  } = req.body;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }
    if (data.length > 0) {
      JSON.parse(data).forEach(el => {
        arr.push(el);
      });
      arr.push(req.body);
      fs.writeFile(filePath, JSON.stringify(arr), err => {
        if (err) {
          throw err;
        }
      });
    } else {
      let ordersArr = [];
      ordersArr.push(req.body);
      fs.writeFile(filePath, JSON.stringify(ordersArr), err => {
        if (err) {
          throw err;
        }
      });
    }
  });

  const idUser = req.body.user;
  const user = allUsers.find(el => el.id === +idUser);
  let userBody;

  const orderedProducts = req.body.products;
  const orderedProductsNamesArr = [];
  orderedProducts.map(elem => {
    const prod = allProducts.find(el => el.id === +elem);
    if (prod) {
      orderedProductsNamesArr.push(prod.name);
    }
    return orderedProductsNamesArr;
  });

  const body = {
    orderId: Date.now(),
    userId: user.id,
    products: orderedProductsNamesArr,
    deliveryType,
    deliveryAdress
  };

  if (orderedProductsNamesArr.length > 0) {
    userBody = {
      status: "success",
      order: body
    };

  } else {
    userBody = {
      status: 'failed',
      order: null
    };
  }

  res.status(200).json(userBody);

}

module.exports = {
  postOrder
};