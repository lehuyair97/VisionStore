
const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  logo: String, 
  type: 'PC' | 'laptop' | 'PK' | 'LK'
});

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
