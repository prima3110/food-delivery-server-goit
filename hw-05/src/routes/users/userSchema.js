const mongoose = require('mongoose');
const {
  Schema
} = mongoose;
const timestamp = require('../../db/middleware/timestamp');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  telephone: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  favoriteProducts: Array,
  viewedProducts: Array,
  orders: Array
});

userSchema.plugin(timestamp);

const User = mongoose.model('User', userSchema);

module.exports = User;