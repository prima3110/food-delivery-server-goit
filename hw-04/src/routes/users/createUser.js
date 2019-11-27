const User = require('./userSchema');
const bcrypt = require('bcrypt');

const createUser = async (request, response) => {
  try {
    const user = request.body;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userData = {
      ...user,
      password: hashedPassword
    };
    const newUser = await new User(userData);

    const createdUser = await newUser.save();
    response.status(201).json(createdUser);
  } catch (err) {
    response.status(500).json(err);
  }
};

module.exports = createUser;