const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true }, 
  receiverId: { type: String, required: true }, 
  content: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }, 
  isAdmin: { type: Boolean, default: false },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
