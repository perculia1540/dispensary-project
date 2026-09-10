const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const { createMessage, getMessages } = require("../controllers/contactController");

const contactValidationRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("A valid email address is required"),
  body("message").trim().notEmpty().withMessage("Message is required"),
];

router.post("/", contactValidationRules, createMessage);
router.get("/", getMessages);

module.exports = router;
