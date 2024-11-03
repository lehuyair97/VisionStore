// models/voucherModel.js
const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
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
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  usedBy: [{
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    usedAt: {
      type: Date,
      default: Date.now
    }
  }],
});

module.exports = mongoose.model("Voucher", voucherSchema);
