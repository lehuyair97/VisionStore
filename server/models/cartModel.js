const mongoose = require("mongoose");

const cartModel = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  carts: [
    {
      price: Number,
      productName: String,
      quantity: Number,
      image: String,
      productId: String,
    },
  ],
  totalBill: {
    type: Number,
    required: true,
  },
});

const cart = mongoose.model("Cart", cartModel);

module.exports = cart;
