const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  
  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderItems',
    require: true
  }],

  shippingAddress1: { type: String, require: true },
  shippingAddress2: { type: String, require: false },
  city: { type: String, require: true },
  zip: { type: String, require: true },
  country: { type: String, require: true },
  phone: { type: Number, require: true },
  status: { type: String, require: true, default: 'Pending' },
  totalNumber: { type: Number, require: true },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },

  dateOrdered: { type: Date, default: Date.now },
});

const Orders = mongoose.model("Orders", OrderSchema);

module.exports = Orders;
