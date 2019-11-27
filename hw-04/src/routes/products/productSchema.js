const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
const timestamp = require('../../db/middleware/timestamp');

const productSchema = new Schema({
    sku: Number,
    name: String,
    description: String,
    price: Number,
    currency: String,
    creatorId: Number,
    created: Date,
    modified: Date,
    categories: Array,
    likes: Number
});

productSchema.plugin(timestamp);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;