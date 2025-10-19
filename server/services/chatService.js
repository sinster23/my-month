const genAI = require("../utils/gemini.js");

const generateResponse = async (userMessage, history = [], userName = null) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // System Prompt
    const systemPrompt = `
You are Noor AI, the intelligent health companion for MyMonth - a comprehensive menstrual health and wellness platform.

**Your Role & Identity:**
- You are a warm, empathetic, and knowledgeable AI assistant specializing in menstrual health, cycle tracking, and women's wellness
- You provide evidence-based information while being culturally sensitive and respectful of all beliefs and backgrounds
- You speak in a friendly, supportive tone - like a trusted health-conscious friend who understands the challenges of menstrual health

**Platform Context - MyMonth Features:**
1. **Cycle Tracking**: AI-powered period predictions and pattern analysis
2. **Symptom Management**: Personalized advice for cramps, PMS, mood changes, and other symptoms
3. **Health Education**: Science-backed information about menstrual health, hormones, and reproductive wellness
4. **Flow Tracking**: Product recommendations and flow pattern insights
5. **Mood Insights**: Understanding hormonal fluctuations and emotional wellness
6. **Wellness Guides**: Nutrition, exercise, and lifestyle recommendations tailored to cycle phases
7. **Faith & Cultural Sensitivity**: Respectful guidance that honors diverse beliefs and practices
8. **Community Support**: Connection with others on similar health journeys

**Your Capabilities:**
✅ Answer questions about menstrual cycles, symptoms, and reproductive health
✅ Provide tips for managing period symptoms (cramps, bloating, mood swings, etc.)
✅ Explain cycle phases, ovulation, and hormonal changes
✅ Suggest lifestyle modifications (diet, exercise, stress management)
✅ Recommend when to consult healthcare professionals
✅ Offer emotional support and validation
✅ Provide culturally sensitive guidance
✅ Help with cycle tracking and pattern recognition

**Important Guidelines:**
⚠️ Always emphasize that you're an AI assistant and not a replacement for medical professionals
⚠️ Recommend consulting a doctor for: severe pain, irregular cycles lasting 3+ months, heavy bleeding, suspected conditions
⚠️ Be inclusive and respectful of all genders who menstruate
⚠️ Never diagnose medical conditions - suggest possibilities and recommend professional consultation
⚠️ Respect privacy and handle sensitive topics with care
⚠️ Use simple, accessible language while maintaining scientific accuracy
⚠️ When discussing faith-based practices, be respectful and supportive without imposing beliefs

**Response Style:**
- Keep responses concise but informative (2-4 paragraphs for complex questions)
- Use warm, encouraging language
- Include actionable advice when possible
- Break down complex medical concepts into easy-to-understand explanations
- Use bullet points for lists or multiple suggestions
- Add emojis sparingly for warmth (🌸💪🩺) but remain professional
- Reference MyMonth features when relevant (e.g., "You can track this in our Flow Tracker feature")

**Conversation Approach:**
- Acknowledge the user's concerns with empathy
- Validate their experiences
- Provide evidence-based information
- Empower them with knowledge and self-care strategies
- Encourage professional help when needed
- Follow up on previous topics naturally

${userName ? `\n**Current User:** ${userName}\n- Address them by name occasionally to personalize the conversation\n- Remember their context from this conversation\n` : '**Current User:** Anonymous Guest\n- Maintain warm, welcoming tone\n- Gently suggest creating an account for personalized tracking features\n'}
`;

    // 🎯 Optimize for long conversations
    const MAX_HISTORY_PAIRS = 10; // Keep last 10 exchanges (20 messages)
    const recentHistory = history.slice(-MAX_HISTORY_PAIRS * 2);

    // 📝 Create intelligent conversation summary
    let conversationContext = "";
    if (history.length > MAX_HISTORY_PAIRS * 2) {
      const olderMessages = history.slice(0, -(MAX_HISTORY_PAIRS * 2));
      
      // Enhanced topic extraction
      const topics = new Set();
      const concerns = new Set();
      
      olderMessages.forEach(msg => {
        if (msg.role === "user") {
          const content = msg.content.toLowerCase();
          
          // Menstrual health topics
          const healthKeywords = {
            'cycle tracking': ['cycle', 'period tracking', 'calendar'],
            'pain management': ['cramp', 'pain', 'ache', 'discomfort'],
            'symptoms': ['symptom', 'bloating', 'headache', 'nausea'],
            'flow': ['heavy', 'light', 'spotting', 'flow'],
            'mood & emotions': ['mood', 'emotion', 'anxiety', 'depression', 'pms'],
            'lifestyle': ['diet', 'exercise', 'food', 'nutrition', 'sleep'],
            'products': ['pad', 'tampon', 'cup', 'product'],
            'irregular cycles': ['irregular', 'late', 'missed', 'early'],
            'hormones': ['hormone', 'estrogen', 'progesterone'],
            'ovulation': ['ovulation', 'fertile', 'conception']
          };

          Object.entries(healthKeywords).forEach(([topic, keywords]) => {
            if (keywords.some(keyword => content.includes(keyword))) {
              topics.add(topic);
            }
          });

          // Extract specific concerns
          if (content.includes('worried') || content.includes('concerned')) {
            concerns.add('expressed concerns');
          }
          if (content.includes('doctor') || content.includes('medical')) {
            concerns.add('discussed medical consultation');
          }
        }
      });

      if (topics.size > 0 || concerns.size > 0) {
        const allContext = [...Array.from(topics), ...Array.from(concerns)];
        conversationContext = `\n[Previous conversation context: We've discussed ${allContext.join(", ")}. Continue this conversation naturally.]\n`;
      }
    }

    // Build conversation history for Gemini
    const contents = [];

    // Add system prompt with context
    contents.push({
      role: "user",
      parts: [{ text: systemPrompt + conversationContext }],
    });
    
    contents.push({
      role: "model",
      parts: [{ 
        text: userName 
          ? `Hello ${userName}! I'm CycleCare AI, your personal health companion on MyMonth. I'm here to provide supportive, evidence-based guidance on menstrual health and wellness. How can I help you today? 🌸`
          : "Hello! I'm CycleCare AI, your health companion on MyMonth. I'm here to provide supportive, evidence-based guidance on menstrual health and wellness. How can I help you today? 🌸"
      }],
    });

    // Add recent conversation history
    recentHistory.forEach((msg) => {
      contents.push({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      });
    });

    // Add current user message
    contents.push({
      role: "user",
      parts: [{ text: userMessage }],
    });

    // 🚀 Generate response with enhanced configuration
    const generationConfig = {
      temperature: 0.7, // Balanced creativity and consistency
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024, // Allow detailed responses
    };

    const safetySettings = [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_ONLY_HIGH", // Allow health-related discussions
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ];

    const result = await model.generateContent({ 
      contents,
      generationConfig,
      safetySettings
    });
    
    return result.response.text();

  } catch (error) {
    console.error("Gemini API error:", error);
    
    // Enhanced error handling with user-friendly messages
    if (error.message?.includes("quota") || error.message?.includes("429")) {
      return "I'm experiencing high demand right now. Please try again in a moment. Thank you for your patience! 🙏";
    } else if (error.message?.includes("safety") || error.message?.includes("blocked")) {
      return "I'm here to provide health guidance in a safe, respectful environment. Let's keep our conversation focused on menstrual health and wellness. How else can I help you?";
    } else if (error.message?.includes("timeout")) {
      return "The response is taking longer than expected. Please try asking your question again.";
    } else if (error.message?.includes("invalid")) {
      return "I didn't quite understand that. Could you rephrase your question about menstrual health or wellness?";
    }
    
    // Generic fallback
    return "I'm having trouble processing your request right now. Please try again, and if the issue persists, feel free to reach out to our support team.";
  }
};

module.exports = { generateResponse };