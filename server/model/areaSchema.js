const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
  areaName: {
    type: String,
    required: true,
  },
  families: {
    type: Number,
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
  representitive: {
    type: String,
  },

  date: {
    type: Date,
    required: true,
  },
});

const Areas = mongoose.model("areas", areaSchema);

module.exports = Areas;
