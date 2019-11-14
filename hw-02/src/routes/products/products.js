const fs = require('fs');
const path = require('path');
const url = require('url');
const allProducts = require('../../db/products/all-products.json');
const querystring = require('querystring');
const mainRoute = require('../main/main');

const getId = url => {
	const lastIndex = url.lastIndexOf('/');

	if (lastIndex !== -1) {
		return url.slice(lastIndex + 1);
	}
};

const productsRoute = (request, response) => {

	let bodyResponse;
	let productsArr = [];

	const filePath = path.join(__dirname, '../../', 'db/', 'products/all-products.json');
	const parsedUrl = url.parse(request.url);
	const id = getId(parsedUrl.path);

	const parsedQuerystringId = querystring.parse(id);
	const parsedQuerystringIdValue = Object.values(parsedQuerystringId)[0];

	const singleQuotesStartIndex = parsedQuerystringIdValue.indexOf("'");
	const singleQuotesFinishIndex = parsedQuerystringIdValue.lastIndexOf("'");

	const doubleQuotesStartIndex = parsedQuerystringIdValue.indexOf('"');
	const doubleQuotesFinishIndex = parsedQuerystringIdValue.lastIndexOf('"');

	const elementsString = parsedQuerystringIdValue.slice(singleQuotesStartIndex + 1, singleQuotesFinishIndex);
	const elementsArr = elementsString.split(",");

	const categoryName = parsedQuerystringIdValue.slice(doubleQuotesStartIndex + 1, doubleQuotesFinishIndex);

	if (id === 'products') {

		response.writeHead(200, {
			"Content-Type": "application/json"
		});
		const readStream = fs.createReadStream(filePath);
		readStream.pipe(response);

	} else if (+id % 1 === 0) {

		const product = allProducts.find(elem => elem.id === +id);

		if (product) {
			productsArr.push(product);
		}

		if (productsArr.length > 0) {
			bodyResponse = {
				"status": "success",
				"products": productsArr
			};
		} else {
			bodyResponse = {
				"status": "no products",
				"products": []
			};
		}

		response.writeHead(200, {
			"Content-Type": "application/json"
		});
		response.write(JSON.stringify(bodyResponse));
		response.end();

	} else if (id.includes('?ids')) {

		elementsArr.forEach(element => {
			const product = allProducts.find(elem => elem.id === +element);
			if (product) {
				productsArr.push(product);
			}
		});

		if (productsArr.length > 0) {
			bodyResponse = {
				"status": "success",
				"products": productsArr
			};
		} else {
			bodyResponse = {
				"status": "no products",
				"products": []
			};
		}

		response.writeHead(200, {
			"Content-Type": "application/json"
		});
		response.write(JSON.stringify(bodyResponse));
		response.end();

	} else if (id.includes('?category')) {

		allProducts.filter(elem => {
			if (elem.categories[0] === categoryName) {
				productsArr.push(elem);
			}
		});

		if (productsArr.length > 0) {
			bodyResponse = {
				"status": "success",
				"products": productsArr
			};
		} else {
			bodyResponse = {
				"status": "no products",
				"products": []
			};
		}

		response.writeHead(200, {
			"Content-Type": "application/json"
		});
		response.write(JSON.stringify(bodyResponse));
		response.end();

	} else {
		mainRoute(request, response);
	}
}

module.exports = productsRoute;