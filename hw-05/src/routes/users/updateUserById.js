const User = require('./userSchema');
const bcrypt = require('bcrypt');

const updateUserById = async (request, response) => {
  try {
    const saltRounds = 10;
    const user = request.body;
    const id = request.params.id;

    if (user.password) {
      user.password = await bcrypt.hash(user.password, saltRounds);
    }

    const updatedUser = await User.findOneAndUpdate({
        _id: id
      },
      user);
    response.status(200).json({
      status: 'success',
      updatedUser
    });
  } catch (err) {
    response.status(500).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = updateUserById;