const mongoose = require("mongoose");

const paymentTransactionsSchema = new mongoose.Schema({
  id: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  paymentMethod: { type: String, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, required: true },
  paymentReference: { type: String },
});

const addressSchema = new mongoose.Schema({
  location: String,
  detail: String,
});

const userSchema = new mongoose.Schema({
  userName: { type: String },
  email: { type: String, required: true, unique: true },
  display_name: { type: String },
  password: { type: String, required: true },
  avatar: { type: String },
  address: [addressSchema],
  phoneNumber: { type: Number },
  favorites: {
    type: Array,
    default: [],
  },
  payment_transaction: [paymentTransactionsSchema],
  device_token: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  paymentTransactionsSchema,
  addressSchema,
};
