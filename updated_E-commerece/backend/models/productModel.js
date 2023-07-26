const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  qty: Number,
  cat: String,
  des: String,
  uploadedBy: String,
  status: String,
  images: Array,
  sellCount: Number,
});

const product = mongoose.model("product", prodSchema);

module.exports = product;
