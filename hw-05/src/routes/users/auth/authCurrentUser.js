const {
  secretKey
} = require('../../../../config');
const jwt = require('jsonwebtoken');
const User = require('../userSchema');


const authCurrentUser = async (request, response, next) => {
  try {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];

    if (!token) {
      return response.status(403).json({
        status: false,
        message: 'No token provided.'
      });
    } else {

      jwt.verify(token, secretKey, async (err, decoded) => {
        const username = decoded.username;
        const foundUser = await User.findOne({
          username: username
        });
        response.status(200).json({
          status: "success",
          foundUser
        });

      });
    }
  } catch (err) {
    response.status(500).json({
      status: "error",
      message: err.message
    });
  }
}

module.exports = authCurrentUser;