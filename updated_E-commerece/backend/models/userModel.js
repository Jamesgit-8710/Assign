const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  prof: String,
  cart: Array,
  status: Boolean,
  date: String,
  profile: String,
});

const users = mongoose.model("users", userSchema);

module.exports = users;
