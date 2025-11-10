const express = require("express");
const { getLocation } = require("../controllers/locationController");
const router = express.Router();

// Get all doctors
router.get("/nearby", getLocation)

module.exports = router;
