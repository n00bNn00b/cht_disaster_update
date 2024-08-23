const express = require("express");
const router = express.Router();

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
router.put("/services/:name", async (req, res) => {
  const name = req.params.teamName;
  const {
    teamName,
    workingArea,
    contact,
    providedService,
    date,
    status,
    isVerifiedByAdmin,
  } = req.body;
  try {
    const service = await Services.findOne({ name });
    if (!service) {
      return res.status(404).json({
        error: "Service not found",
      });
    } else {
      service.teamName = teamName;
      service.workingArea = workingArea;
      service.contact = contact;
      service.providedService = providedService;
      service.status = status;
      service.date = date;
      service.isVerifiedByAdmin = isVerifiedByAdmin;

      await service.save();
      res.status(200).json({ message: "Service updated successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
