const User = require('./userSchema');

const getAllUsers = async (request, response) => {
  try {
    const foundUsers = await User.find({});
    response.status(200).json({
      status: "success",
      foundUsers
    });
  } catch (err) {
    response.status(500).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = getAllUsers;