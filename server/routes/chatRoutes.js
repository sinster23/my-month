const express = require("express");
const { handleChat } = require("../controllers/chatController.js");

const router = express.Router();

// POST /api/chat
router.post("/", handleChat);

module.exports = router;
