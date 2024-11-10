const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  expiration_date: {
    type: Date,
    required: true,
  },
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  type: {
    type: String,
    enum: ["discount", "shipping"],
    required: true,
  },
  usedBy: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      usedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Voucher", voucherSchema);
