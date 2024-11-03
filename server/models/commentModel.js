// models/commentModel.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
