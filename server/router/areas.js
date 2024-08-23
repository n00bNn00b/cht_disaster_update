const express = require("express");
const router = express.Router();

require("../db/connection");
const Areas = require("../model/areaSchema");

router.post("/areas/add", async (req, res) => {
  const { areaName, date } = req.body;

  try {
    const newArea = new Areas({
      areaName,
      date,
    });

    // Save the new area to the database
    await newArea.save();

    res.status(201).json({ message: "New Area added Successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/areas", async (req, res) => {
  try {
    const areas = await Areas.find();
    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
