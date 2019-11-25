const User = require('./userSchema');
const bcrypt = require('bcrypt');

const createUser = async (request, response) => {
  try {
    const user = request.body;
    const notUniqueUser = await User.findOne({
      email: request.body.email
    });
    if (notUniqueUser) {
      return response.status(400).send("User already registered.")
    };
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userData = {
      ...user,
      password: hashedPassword
    };
    const newUser = await new User(userData);

    const createdUser = await newUser.save();
    response.status(201).json({
      status: "success",
      user: createdUser
    });
  } catch (err) {
    response.status(500).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = createUser;