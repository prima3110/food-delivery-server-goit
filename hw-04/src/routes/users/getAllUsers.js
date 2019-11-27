const User = require('./userSchema');

const getAllUsers = async (request, response) => {
  try {
    const foundUsers = await User.find({});
    response.status(200).json(foundUsers);
  } catch (err) {
    response.status(500).json(err);
  }
};

module.exports = getAllUsers;