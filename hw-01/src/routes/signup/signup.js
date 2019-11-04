fs = require('fs');
path = require('path');

  const signUpRoute = async(request, response) => {

      
      if(request.method === 'POST') {
          let body = '';
         await request.on('data', function (data) {
              body = body + data;
          });

       const userName = JSON.parse(body);
       const filePath = path.join(__dirname, '../../', 'db/', 'users/', `${userName.username}.json`);
       fs.writeFile(filePath, body, err => {
           if (err) {
               throw err;
           }
       });

       response.writeHead(200, {'Content-Type': 'application/json'});
       response.write(`{
            'status': 'success',
            'user': ${body}
           }`);
           response.end();
      }
  };

  module.exports = signUpRoute;