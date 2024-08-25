const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
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

// router.get("/areas", async (req, res) => {
//   try {
//     const areas = await Areas.find();
//     res.status(200).json(areas);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error!" });
//   }
// });

//get api for areas with pagination
router.get("/areas", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // Adjust the limit as needed

    const areas = await Areas.find()
      .sort({
        date: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalRecords = await Areas.countDocuments();
    const totalPages = Math.ceil(totalRecords / limit);

    res.status(200).json({
      data: areas,
      currentPage: page,
      totalPages,
      totalRecords,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

//update
router.put("/areas/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new mongoose.Types.ObjectId(id) };
  const { areaName, date } = req.body;
  try {
    const area = await Areas.findOne(query);
    if (!area) {
      return res.status(404).json({
        error: "Area not found",
      });
    } else {
      area.areaName = areaName; // Use areaName instead of teamName
      area.date = date;
      await area.save();
      res.status(200).json({ message: "Area updated successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
