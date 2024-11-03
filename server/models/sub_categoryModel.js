const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  sub_category_type: {
    type: String,
    enum: ["components", "accessories"],
    required: true,
  },
  sub_category_list: [{ name: String, image: String }],
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
