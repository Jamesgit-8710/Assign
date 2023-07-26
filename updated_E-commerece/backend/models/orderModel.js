const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  itemId: String,
  count: Number,
  price: Number,
  user: String,
  vendor: String,
  status: String,
  payMethod: String,
  address: String,
  track: Number,
});

const order = mongoose.model("order", orderSchema);

module.exports = order;
