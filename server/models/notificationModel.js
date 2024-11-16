const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: mongoose.Types.ObjectId,
      ref: "Order",
    },
    type: {
      type: String,
      required: true,
      enum: ["message", "alert", "promotion", "reminder"],
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
