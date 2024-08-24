const mongoose = require("mongoose");

const victimSchema = new mongoose.Schema({
  victimName: {
    type: String,
    required: true,
  },
  familyMember: {
    type: Number,
    required: true,
  },
  contact: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Victims = mongoose.model("victims", victimSchema);

module.exports = Victims;
