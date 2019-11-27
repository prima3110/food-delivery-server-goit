const mongoose = require('mongoose');
const {
  Schema
} = mongoose;
const timestamp = require('../../db/middleware/timestamp');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  telephone: String,
  nickName: String,
  location: String,
  password: String,
  email: String,
  favoriteProducts: Array,
  viewedProducts: Array,
  orders: Array
});

userSchema.plugin(timestamp);

const User = mongoose.model('User', userSchema);

module.exports = User;