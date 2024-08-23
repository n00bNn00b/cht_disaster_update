const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
  },
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;
