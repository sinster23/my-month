const { generateResponse } = require("../services/chatService.js");
const Chat = require("../models/Chat.js");

const getUserFromRequest = (req) => {
  if (req.user) {
    return {
      name: req.user.name || req.user.username || null,
      email: req.user.email || null,
      id: req.user.id || req.user._id || null
    };
  }
  
  if (req.session && req.session.user) {
    return {
      name: req.session.user.name || req.session.user.username || null,
      email: req.session.user.email || null,
      id: req.session.user.id || req.session.user._id || null
    };
  }
  
  if (req.body.userName) {
    return {
      name: req.body.userName,
      email: req.body.userEmail || null,
      id: null
    };
  }
  
  return null;
};

const handleChat = async (req, res, next) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ 
        error: "Message is required",
        reply: "Please provide a message to continue our conversation."
      });
    }

    if (typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ 
        error: "Invalid message format",
        reply: "Please provide a valid message."
      });
    }

    if (history && !Array.isArray(history)) {
      return res.status(400).json({ 
        error: "History must be an array",
        reply: "There was an issue with the conversation history."
      });
    }

    const userInfo = getUserFromRequest(req);
    const userName = userInfo?.name || null;

    console.log('💬 Chat Request:', {
      user: userName || 'Anonymous',
      messageLength: message.length,
      historyLength: history?.length || 0,
      timestamp: new Date().toISOString()
    });

    const reply = await generateResponse(
      message, 
      history || [], 
      userName
    );

    res.status(200).json({ 
      reply,
      success: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("❌ Chat Controller Error:", error);

    if (error.message?.includes("quota") || error.message?.includes("429")) {
      return res.status(429).json({
        error: "Rate limit exceeded",
        reply: "I'm experiencing high demand right now. Please try again in a moment. 🙏",
        success: false
      });
    }

    if (error.message?.includes("safety") || error.message?.includes("blocked")) {
      return res.status(400).json({
        error: "Content safety issue",
        reply: "I'm here to provide health guidance in a safe, respectful environment. Let's keep our conversation focused on menstrual health and wellness.",
        success: false
      });
    }

    if (error.message?.includes("timeout")) {
      return res.status(504).json({
        error: "Request timeout",
        reply: "The response is taking longer than expected. Please try asking your question again.",
        success: false
      });
    }

    const userFriendlyError = new Error("Failed to process chat message");
    userFriendlyError.originalError = error;
    userFriendlyError.statusCode = 500;
    userFriendlyError.userMessage = "I'm having trouble processing your request right now. Please try again in a moment.";
    
    next(userFriendlyError);
  }
};

const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select('title createdAt messages');
    res.json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};

const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, user: req.user.id });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.json(chat);
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({ message: "Failed to fetch chat" });
  }
};

const createChat = async (req, res) => {
  try {
    const chat = new Chat({
      user: req.user.id,
      title: req.body.title || "New Chat",
      messages: [],
    });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ message: "Failed to create chat" });
  }
};

const addMessage = async (req, res) => {
  try {
    const { role, content } = req.body;
    
    if (!role || !content) {
      return res.status(400).json({ message: "Role and content are required" });
    }

    const chat = await Chat.findOne({ _id: req.params.id, user: req.user.id });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.messages.push({ role, content });
    await chat.save();
    res.json(chat);
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ message: "Failed to add message" });
  }
};

const updateChatTitle = async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ message: "Valid title is required" });
    }

    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title: title.trim() },
      { new: true }
    );
    
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    
    res.json(chat);
  } catch (error) {
    console.error("Error updating chat title:", error);
    res.status(500).json({ message: "Failed to update chat title" });
  }
};

module.exports = { 
  handleChat, 
  getChats, 
  getChatById, 
  createChat, 
  addMessage,
  updateChatTitle 
};