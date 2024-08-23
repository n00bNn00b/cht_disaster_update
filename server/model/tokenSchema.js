const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Tokens = mongoose.model("tokens", tokenSchema);

module.exports = Tokens;
