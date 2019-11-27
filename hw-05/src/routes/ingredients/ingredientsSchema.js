const mongoose = require('mongoose');
const {
  Schema
} = mongoose;
const timestamp = require('../../db/middleware/timestamp');

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

ingredientSchema.plugin(timestamp);

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;