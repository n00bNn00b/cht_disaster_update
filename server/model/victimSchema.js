const mongoose = require("mongoose");

const victimSchema = new mongoose.Schema({
  victimName: {
    type: String,
    required: true,
  },
  familyMember: {
    type: Number,
  },
  contact: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  union: {
    type: String,
  },
  subDistrict: {
    type: String,
  },
  district: {
    type: String,
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
