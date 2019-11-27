const mongoose = require('mongoose');
const {
  Schema
} = mongoose;
const timestamp = require('../../db/middleware/timestamp');

const commentSchema = new Schema({
  product: String,
  author: String,
  text: String,
  mark: Number
});

commentSchema.plugin(timestamp);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;