const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../db/connection");
const Victims = require("../model/victimSchema");

router.post("/victims/add", async (req, res) => {
  const {
    victimName,
    familyMember,
    contact,
    address,
    union,
    subDistrict,
    district,
    status,
    date,
  } = req.body;

  try {
    const newVictim = new Victims({
      victimName,
      familyMember,
      contact,
      address,
      union,
      subDistrict,
      district,
      status,
      date,
    });

    // Save the new area to the database
    await newVictim.save();

    res.status(201).json({ message: "New Victim added Successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

router.get("/victims", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // Adjust the limit as needed

    const victims = await Victims.find()
      .sort({
        date: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalRecords = await Victims.countDocuments();
    const totalPages = Math.ceil(totalRecords / limit);

    res.status(200).json({
      data: victims,
      currentPage: page,
      totalPages,
      totalRecords,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
