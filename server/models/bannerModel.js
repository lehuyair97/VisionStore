const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

const Banner = mongoose.model("Banner", bannerSchema);
module.exports = Banner;
