const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  workingArea: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  providedService: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isVerifiedByAdmin: {
    type: Boolean,
  },
});

const Services = mongoose.model("services", serviceSchema);

module.exports = Services;
