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
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
  customerPhoneNumber: {
    type: Number,
    required: true,
  },
  paymentTransactions: {
    type: paymentTransactionsSchema,
    required: true,
  },
  totalBill: {
    type: Number,
    required: true,
  },
  carts: {
    type: Array,
    required: true,
  },
  orderDate: {
    type: String,
    default: () => moment().format("dddd, DD/MM/YYYY HH:mm:ss"),
  },
  voucher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voucher' 
}
});

const Order = mongoose.model("Order", orderModel);

module.exports = Order;
