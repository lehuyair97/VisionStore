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
const Role = {
  CLIENT: "client",
  ADMIN: "admin",
};
const addressSchema = new mongoose.Schema({
  location: String,
  detail: String,
  district_id: Number,
  ward_code: Number,
  isSelected: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new mongoose.Schema({
  userName: { type: String },
  email: { type: String, required: true, unique: true },
  display_name: { type: String },
  password: { type: String, required: true },
  avatar: { type: String },
  address: [addressSchema],
  addressSelected: {
    location: String,
    detail: String,
    district_id: Number,
    ward_code: Number,
  },
  phoneNumber: { type: Number },
  favorites: {
    type: Array,
    default: [],
  },
  payment_transaction: [paymentTransactionsSchema],
  device_token: { type: String },
  createdAt: { type: Date, default: Date.now },
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.CLIENT,
  },
  recent_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  paymentTransactionsSchema,
  addressSchema,
};
//add
