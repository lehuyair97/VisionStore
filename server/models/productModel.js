const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  parent_product_id: { type: String },
  sku: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: Number },
  descriptions: { type: String },
  thumbnail: { type: String },
  image: { type: String },
  optionsColor: {
    type: [
      {
        color: { type: String },
        name: { type: String },
      },
    ],
  },
  optionsMemory: {
    type: [
      {
        name: { type: String },
      },
    ],
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  sub_category_id: { type: String },
  option_id: { type: mongoose.Schema.Types.ObjectId, ref: "Option" },
  create_date: { type: Date, default: Date.now },
  stock: { type: Number, default: 0 },
  warrantyPeriod: { type: String },
  description: { type: String },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
  products_child: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  compatible_with: {
    memory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    processor: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    motherboard: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    graphics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    storage: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  sub_category: {},
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
