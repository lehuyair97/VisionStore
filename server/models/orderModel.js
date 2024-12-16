const mongoose = require("mongoose");
const moment = require("moment");
const { paymentTransactionsSchema } = require("../models/userModel");

const orderModel = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  customerName: String,
  customerEmail: String,
  customerAddress: String,
  customerPhoneNumber: Number,
  paymentTransactions: paymentTransactionsSchema,
  paymentMethod: {},
  deliveryMethod: {},
  totalBill: {
    type: Number,
    required: true,
  },
  option: {},
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName: String,
      price: Number,
      description: String,
      quantity: Number,
      image: String,
    },
  ],
  orderDate: {
    type: String,
    default: () => moment().format("dddd, DD/MM/YYYY HH:mm:ss"),
  },
  status: {
    type: String,
    enum: ["pending", "shipping", "delivered", "canceled"],
    default: "pending",
  },
  voucher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Voucher",
  },
  hasCommented: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,  
});

const Order = mongoose.model("Order", orderModel);

module.exports = Order;
