const express = require("express");
const { createAppointment, getUserAppointments } = require("../controllers/appointmentController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

// Get all doctors
router.post("/", authMiddleware, createAppointment)

// Get a specific doctor
router.get("/my", authMiddleware, getUserAppointments);

module.exports = router;
