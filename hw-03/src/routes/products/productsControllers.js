const allProducts = require('../../db/products/all-products.json');

let bodyResponse;
const productsArr = [];

const getProducts = (req, res, next) => {

    const reqKeyWord = Object.keys(req.query)[0];

    if (req.path === '/products' || req.path === '/products/') {
        if (reqKeyWord === 'ids' || reqKeyWord === 'category' || !reqKeyWord) {

            bodyResponse = {
                status: "success",
                products: allProducts
            };

            res.status(200).json(bodyResponse);

        } else {
            next();
            return;
        }

    } else {
        next();
        return;
    }

};

const getProductById = (req, res, next) => {

    const product = allProducts.find(elem => JSON.stringify(elem.id) === req.params.id);

    if (product) {
        bodyResponse = {
            status: "success",
            products: product
        };
    } else {
        bodyResponse = {
            status: "no products",
            products: []
        };
    }

    res.status(200).json(bodyResponse);
};

const getProductsByIds = (req, res, next) => {
    const reqKeyWord = Object.keys(req.query)[0];

    if (reqKeyWord !== 'ids') {
        next();
        return;
    }

    productsArr.length = 0;
    const reqIdsArr = req.query.ids.slice(1, -1).split(',');

    reqIdsArr.forEach(element => {
        const product = allProducts.find(elem => elem.id === +element);
        if (product) {
            productsArr.push(product);
        }
    })

    if (productsArr.length > 0) {
        bodyResponse = {
            status: "success",
            products: productsArr
        };
    } else {
        bodyResponse = {
            status: "no products",
            products: []
        };
    }
    res.status(200).json(bodyResponse);
};

const getProductsByCategory = (req, res, next) => {

    const reqKeyWord = Object.keys(req.query)[0];

    if (reqKeyWord !== 'category') {
        next();
        return;
    }

    productsArr.length = 0;

    allProducts.filter(elem => {
        if (elem.categories[0] === req.query.category.slice(1, -1)) {
            productsArr.push(elem);
        }
    });

    if (productsArr.length > 0) {
        bodyResponse = {
            status: "success",
            products: productsArr
        };
    } else {
        bodyResponse = {
            status: "no products",
            products: []
        };
    }
    res.status(200).json(bodyResponse);
};

module.exports = {
    getProducts,
    getProductById,
    getProductsByIds,
    getProductsByCategory
};