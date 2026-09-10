const { validationResult } = require("express-validator");
const ContactMessage = require("../models/ContactMessage");

// POST /api/contact -> create a new contact message (used by contact.html form)
exports.createMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  try {
    const contactMessage = await ContactMessage.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contactMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while sending message",
      error: error.message,
    });
  }
};

// GET /api/contact -> list all messages (for an admin dashboard)
exports.getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching messages",
      error: error.message,
    });
  }
};
