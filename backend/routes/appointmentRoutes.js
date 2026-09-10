const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

// Validation rules mirror the "required" attributes on appointment.html
const appointmentValidationRules = [
  body("fullname").trim().notEmpty().withMessage("Full name is required"),
  body("registration").trim().notEmpty().withMessage("Registration number is required"),
  body("phone").trim().notEmpty().withMessage("Phone number is required"),
  body("email").trim().isEmail().withMessage("A valid email address is required"),
  body("gender").isIn(["Male", "Female"]).withMessage("Gender must be Male or Female"),
  body("date").notEmpty().withMessage("Appointment date is required"),
  body("time").notEmpty().withMessage("Appointment time is required"),
  body("service")
    .isIn([
      "General Consultation",
      "Health Checkup",
      "Medical Advice",
      "Laboratory Services",
    ])
    .withMessage("Please select a valid service"),
  body("reason").trim().notEmpty().withMessage("Reason for visit is required"),
];

router.post("/", appointmentValidationRules, createAppointment);
router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
