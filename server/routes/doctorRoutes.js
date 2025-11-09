const express = require("express");
const { getAllDoctors, getDoctor } = require("../controllers/doctorController");
const router = express.Router();

// Get all doctors
router.get("/", getAllDoctors)

// Get a specific doctor
router.get("/:id", getDoctor);

module.exports = router;
