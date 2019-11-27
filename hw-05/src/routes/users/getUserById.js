const User = require('./userSchema');

const getUserById = async (request, response) => {
  try {
    const id = request.params.id;
    const foundUser = await User.findById(id);
    response.status(200).json({
      status: 'success',
      foundUser
    });
  } catch (err) {
    response.status(404).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = getUserById;