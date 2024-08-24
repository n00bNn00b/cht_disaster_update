const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../db/connection");
const Services = require("../model/serviceSchema");

router.post("/services/add", async (req, res) => {
  const {
    teamName,
    workingArea,
    contact,
    providedService,
    status,
    date,
    isVerifiedByAdmin,
  } = req.body;

  try {
    const newService = new Services({
      teamName,
      workingArea,
      contact,
      providedService,
      status,
      date,
      isVerifiedByAdmin,
    });

    // Save the new service to the database
    await newService.save();

    res.status(201).json({ message: "Team Service added Successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/services", async (req, res) => {
  try {
    const services = await Services.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

//update
router.put("/services/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new mongoose.Types.ObjectId(id) }; // Use the correct parameter name
  const updateData = req.body; // Capture all update data in one object

  try {
    const service = await Services.findOneAndUpdate(query, updateData, {
      new: true,
    }); // Update and return updated data
    if (!service) {
      return res.status(404).json({
        error: "Service not found",
      });
    } else {
      res
        .status(200)
        .json({ message: "Service updated successfully!", data: service });
    }

    // Include updated data in response
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
