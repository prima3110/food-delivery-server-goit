const User = require('./userSchema');

const deleteUserById = async (request, response) => {
  try {
    const id = request.params.id;
    const deletedUser = await User
      .findById(id)
      .remove();
    response.status(200).json(deletedUser);
  } catch (err) {
    response.status(500).json(err);
  }
};

module.exports = deleteUserById;