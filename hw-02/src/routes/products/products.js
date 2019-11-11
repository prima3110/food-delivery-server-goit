const fs = require('fs');
const path = require('path');
const url = require('url');
const allProducts = require('../../db/products/all-products.json');

const getId = url => {
    const lastIndex = url.lastIndexOf('/');

    if (lastIndex !== -1) {
      return url.slice(lastIndex +1);
    }
  };

const productsRoute = (request, response) => {
    const filePath = path.join(__dirname, '../../', 'db/', 'products/all-products.json');
    const parsedUrl = url.parse(request.url);
    const id = getId(parsedUrl.path);
    let bodyResponse;
    let productsArr = [];
    response.writeHead(200, {"Content-Type": "application/json"});

        if (id === 'products'){

        const readStream = fs.createReadStream(filePath);
        readStream.pipe(response);

    } else if (+id % 1 === 0){

        const product = allProducts.find(elem => elem.id === +id);
        productsArr.push(product);
               bodyResponse = {
                "status": "success", 
                "products": productsArr
               }

            response.write(JSON.stringify(bodyResponse));
            response.end();

        } else if(id.includes('?ids')){

            const elementsIdFirst = id.indexOf("%27");
            const elementsIdLast = id.lastIndexOf("%27");

            if (elementsIdFirst !== -1) {

                const elementsString = id.slice(elementsIdFirst +3, elementsIdLast);
                const elementsArr = elementsString.split(",");
  
                elementsArr.map(element => {
                    const product = allProducts.find(elem => elem.id === +element);
                    productsArr.push(product);
                });

                bodyResponse = {
                    "status": "success",
                    "products": productsArr
                   };

                response.write(JSON.stringify(bodyResponse));
                response.end();
            }
        } else if (id.includes('?category')){
            const elementsIdFirst = id.indexOf("%22");
            const elementsIdLast = id.lastIndexOf("%22");
            if (elementsIdFirst !== -1) {

                const categoryName = id.slice(elementsIdFirst +3, elementsIdLast);

                allProducts.filter(elem => {
                    if(elem.categories[0] === categoryName){
                        productsArr.push(elem);
                    }
                });

                if(productsArr.length > 0){
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

                response.write(JSON.stringify(bodyResponse));
                response.end();
            }
        }
    
}

module.exports = productsRoute;