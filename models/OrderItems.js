const mongoose = require("mongoose");

const OrderItemsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beverage",
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
});

const OrderItems = mongoose.model("OrderItems", OrderItemsSchema);

module.exports = OrderItems;
