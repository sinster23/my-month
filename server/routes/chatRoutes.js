const express = require("express");
const { handleChat, getChats, getChatById, createChat, addMessage, updateChatTitle } = require("../controllers/chatController.js");
const { authMiddleware } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Public route - anyone can chat
router.post("/", handleChat);

// Protected routes - require authentication
router.get("/history", authMiddleware, getChats);        // all chats for user
router.get("/:id", authMiddleware, getChatById);         // single chat by id
router.post("/new", authMiddleware, createChat);         // new chat session
router.post("/:id/message", authMiddleware, addMessage); // add message to chat
router.patch("/:id", authMiddleware, updateChatTitle);   // update chat title

module.exports = router;