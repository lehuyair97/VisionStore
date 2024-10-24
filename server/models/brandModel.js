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
  brandType: {
    type: String,
    enum: ["PC", "laptop", "PK", "LK"], // Sử dụng enum để giới hạn các giá trị hợp lệ
    required: true,
  },
});

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
