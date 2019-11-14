const fs = require('fs');
const path = require('path');

const signUpRoute = async (request, response) => {


  if (request.method === 'POST') {
    let body = '';
    await request.on('data', function (data) {
      body = body + data;
    });

    const user = JSON.parse(body);


    if (!user.username || !user.telephone || typeof (parseInt(user.telephone)) !== "number" ||
      !user.password || !user.email || !user.email.includes('@')) {
      response.writeHead(400, {
        "Content-Type": "text/plain"
      });
      response.write("Bad Request");
      response.end();
    } else {

      const filePath = path.join(__dirname, '../../', 'db/', 'users/', `${user.username}.json`);
      fs.writeFile(filePath, body, err => {
        if (err) {
          throw err;
        }

        const bodyResponse = {
          status: "success",
          user: JSON.parse(body)
        };

        response.writeHead(201, {
          'Content-Type': 'application/json'
        });
        response.write(JSON.stringify(bodyResponse));
        response.end();
      });

    }
  }
};

module.exports = signUpRoute;