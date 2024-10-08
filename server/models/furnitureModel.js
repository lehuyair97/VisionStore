const mongoose = require("mongoose");
const furnitureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default:5.0
  },
  price: {
    type: Number,
    required: true
  },
  imageLink: {
    type: String,
    required: true
  },
  description:{
    type:String,
    required: true

  },
  reviews:{
    type:Number,
    default:10

  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
});

const Furniture = mongoose.model("Furniture", furnitureSchema);
module.exports = Furniture;
