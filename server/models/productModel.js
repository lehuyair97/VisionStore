const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  parent_product_id: { type: String },
  sku: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: Number },
  descriptions: { type: String },
  thumbnail: { type: String },
  image: { type: String },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  sub_category_id: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
  option_id: { type: mongoose.Schema.Types.ObjectId, ref: "Option" },
  create_date: { type: Date, default: Date.now },
  stock: { type: Number, default: 0 },
  warrantyPeriod: { type: String },
  description: { type: String },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
  products_child: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
