const { generateResponse } = require("../services/chatService.js");


const getUserFromRequest = (req) => {
  // Priority 1: Check if user is authenticated (from auth middleware)
  if (req.user) {
    return {
      name: req.user.name || req.user.username || null,
      email: req.user.email || null,
      id: req.user.id || req.user._id || null
    };
  }
  
  // Priority 2: Check session
  if (req.session && req.session.user) {
    return {
      name: req.session.user.name || req.session.user.username || null,
      email: req.session.user.email || null,
      id: req.session.user.id || req.session.user._id || null
    };
  }
  
  // Priority 3: Check request body (sent from frontend)
  if (req.body.userName) {
    return {
      name: req.body.userName,
      email: req.body.userEmail || null,
      id: null
    };
  }
  
  // No user found - anonymous
  return null;
};

const handleChat = async (req, res, next) => {
  try {
    const { message, history } = req.body;

    // Validate message
    if (!message) {
      return res.status(400).json({ 
        error: "Message is required",
        reply: "Please provide a message to continue our conversation."
      });
    }

    // Validate message is a string and not empty
    if (typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ 
        error: "Invalid message format",
        reply: "Please provide a valid message."
      });
    }

    // Validate history format if provided
    if (history && !Array.isArray(history)) {
      return res.status(400).json({ 
        error: "History must be an array",
        reply: "There was an issue with the conversation history."
      });
    }

    // Extract user information
    const userInfo = getUserFromRequest(req);
    const userName = userInfo?.name || null;

    // Log for debugging and analytics
    console.log('💬 Chat Request:', {
      user: userName || 'Anonymous',
      messageLength: message.length,
      historyLength: history?.length || 0,
      timestamp: new Date().toISOString()
    });

    // Generate AI response with user context
    const reply = await generateResponse(
      message, 
      history || [], 
      userName
    );

    // Optional: Log successful interaction for analytics
    // You can store this in a database for tracking
    if (userInfo?.id) {
      // await logChatInteraction({
      //   userId: userInfo.id,
      //   message,
      //   reply,
      //   timestamp: new Date()
      // });
    }

    // Send successful response
    res.status(200).json({ 
      reply,
      success: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("❌ Chat Controller Error:", error);

    // Handle specific error types
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

    // Pass to error handling middleware with user-friendly message
    const userFriendlyError = new Error("Failed to process chat message");
    userFriendlyError.originalError = error;
    userFriendlyError.statusCode = 500;
    userFriendlyError.userMessage = "I'm having trouble processing your request right now. Please try again in a moment.";
    
    next(userFriendlyError);
  }
};

module.exports = { handleChat };
