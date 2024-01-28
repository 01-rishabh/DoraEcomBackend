const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    averageRating: Number,
    productImage: String,
    volume: Number,
    stock: Number,
    alcoholConcentration: Number,
    beverageDescription: String,
    beverageCategory: String,
    beverageBrand: String

});

// productSchema.virtual('id').get(function () {
//     return this._id.toHexString();
// });

// productSchema.set('toJSON', {
//     virtuals: true,
// });

const Beverage  = mongoose.model('Beverage', productSchema);

module.exports = Beverage;
