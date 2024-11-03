const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["PC", "Laptop", "components", "accessories", "monitor"],
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
