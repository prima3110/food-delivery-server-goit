const jwt = require('jsonwebtoken');
const User = require('../userSchema');
const bcrypt = require('bcrypt');
const {
  secretKey
} = require('../../../../config');


const generateToken = paramsForTokenGeneration => {

  return jwt.sign(paramsForTokenGeneration, secretKey, {
    expiresIn: 60 * 60 * 24
  })
};

const authenticate = async (request, response) => {
  try {
    const {
      username,
      password
    } = request.body;

    const user = await User.findOne({
      username: username
    });

    const correctPassword = bcrypt.compareSync(password, user.password);

    if (!user || !correctPassword) {
      response.status(404).json({
        status: "error",
        message: err.message
      });
      return;
    }

    const payload = {
      password,
      username
    };

    const token = generateToken(payload);

    response.status(200).json({
      status: 'success',
      token: token
    });


  } catch (err) {
    response.status(404).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = authenticate;