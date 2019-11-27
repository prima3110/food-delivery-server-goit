const User = require('./userSchema');

const deleteUserById = async (request, response) => {
  try {
    const id = request.params.id;
    const deletedUser = await User
      .findById(id)
      .remove();
    response.status(200).json({
      status: "success",
      deletedUser: deletedUser
    });
  } catch (err) {
    response.status(500).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = deleteUserById;