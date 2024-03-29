const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    owner : {
      type: ObjectID,
       required: true,
       ref: 'User'
     },

    items: [{
      itemId: {
       type: ObjectID,
       ref: 'Item',
       required: true
    },

    productName:{
        type: String,
        required: true,
        default: "product name"
    },
    productPrice: {
        type: Number,
        required: true,
        default: 0
    },
    
    quantity: Number,

    productImage: String, 
    
    volume: {
       type: Number,
       required: true,
       min: 180,
       default: 0
    },

     }],
    }, {
    timestamps: true
    })

const CartModel  = mongoose.model('CartModel', cartSchema);

module.exports = CartModel;