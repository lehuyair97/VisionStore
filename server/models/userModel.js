const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  CardNumber: { type: Number},
  CVV: { type: Number},
  YearMonth: { type: String }
});

const addressSchema = new mongoose.Schema({
  location: String,
  detail: String
});

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String }, 
  address:[addressSchema],
  phoneNumber:{type:Number},
  favorites:{
    type: Array,
    default: []
  },
  paymentMethod:[paymentMethodSchema],
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;