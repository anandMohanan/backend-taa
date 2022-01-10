const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  photo: String,
  bio: String,
});

module.exports = model("user", userSchema);
