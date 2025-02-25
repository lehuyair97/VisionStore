const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  logo: {
    type: String,
  },
  banner: {
    type: String,
  },
});

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
