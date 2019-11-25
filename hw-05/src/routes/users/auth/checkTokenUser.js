const jwt = require('jsonwebtoken');
const {
  secretKey
} = require('../../../../config');

// POST { token: <token>}

// GET ?token=<token>

// header { x-access-token: <token> }

const checkToken = (req, res, next) => {

  if (req.url === '/auth/login' || req.url === '/auth/register') {
    next();
    return;
  }

  const token = req.body.token || req.query.token || req.headers['x-access-token'];


  if (!token) {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  } else {

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {

        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports = checkToken;