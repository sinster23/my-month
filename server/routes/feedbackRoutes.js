const express = require("express");
const { saveFeedback } = require("../controllers/feedbackController");
const router = express.Router();

// Get all doctors
router.post("/", saveFeedback)

module.exports = router;
