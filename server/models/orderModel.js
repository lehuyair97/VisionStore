const mongoose = require("mongoose");
const moment = require("moment");
const { paymentTransactionsSchema } = require("./userModel");

const orderModel = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  customerName: {
    type: String,
  },
  customerEmail: {
    type: String,
  },
  customerAddress: {
    type: String,
  },
  customerPhoneNumber: {
    type: Number,
  },
  paymentTransactions: {
    type: paymentTransactionsSchema,
  },
  totalBill: {
    type: Number,
    required: true,
  },
  optionsColor: {
    type: String,
  },
  optionsMemory: {
    type: String,
  },
  carts: [
    {
      paymentStatus: {
        type: String,
        enum: [
          "cart",
          "pending",
          "processing",
          "shipped",
          "delivered",
          "canceled",
        ],
        default: "cart",
      },
      price: Number,
      productName: String,
      description:String,
      quantity: Number,
      image: String,
      productId: String
    },
  ],
  orderDate: {
    type: String,
    default: () => moment().format("dddd, DD/MM/YYYY HH:mm:ss"),
  },
  voucher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Voucher",
  },
});

const Order = mongoose.model("Order", orderModel);

module.exports = Order;
