const Feedback = require("../models/Feedback");

exports.saveFeedback = async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ message: "Name and message are required" });
    }

    const feedback = new Feedback({ name, message });
    await feedback.save();

    res.json({ message: "Thank you for your feedback!" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};
