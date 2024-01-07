// Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    averageRating: Number,
    productImage: String,
    quantity: Number,
    alcoholConcentration: Number,
    beverageDescription: String
});

const Beverage  = mongoose.model('Beverage', productSchema);

module.exports = Beverage;
