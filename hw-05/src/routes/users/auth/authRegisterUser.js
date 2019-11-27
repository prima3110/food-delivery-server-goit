const User = require('../userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  secretKey,
  expirationTokenTime
} = require('../../../../config');


const generateToken = paramsForTokenGeneration => {

  return jwt.sign(paramsForTokenGeneration, secretKey, {
    expiresIn: expirationTokenTime
  })
};

const authRegister = async (request, response) => {
  try {
    const user = request.body;
    const {
      username,
      password
    } = request.body;

    const notUniqueUser = await User.findOne({
      email: request.body.email
    });
    if (notUniqueUser) {
      return response.status(400).json({
        status: "error",
        message: "User already exists"
      })
    };

    const payload = {
      password,
      username
    };
    const token = await generateToken(payload);

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userData = {
      ...user,
      password: hashedPassword
    };
    const newUser = await new User(userData);
    const userToCreate = await newUser.save();
    const createdUser = await User.findOne({
      email: userToCreate.email
    });

    response.status(201).json({
      status: "success",
      token,
      user: createdUser
    });

  } catch (err) {
    response.status(500).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = authRegister;