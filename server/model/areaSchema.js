const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
  areaName: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
});

const Areas = mongoose.model("areas", areaSchema);

module.exports = Areas;
