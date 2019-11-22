const User = require('./userSchema');
const bcrypt = require('bcrypt');

const updateUserById = async (request, response) => {
  try {
    const user = request.body;
    const id = request.params.id;

    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    const updatedUser = await User.findOneAndUpdate({
        _id: id
      },
      user);
    response.status(200).json(updatedUser);
  } catch (err) {
    response.status(500).json(err);
  }
};

module.exports = updateUserById;