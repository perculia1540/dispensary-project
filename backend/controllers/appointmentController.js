const { validationResult } = require("express-validator");
const Appointment = require("../models/Appointment");

// POST /api/appointments  -> create a new appointment (used by appointment.html form)
exports.createAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  try {
    const appointment = await Appointment.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Appointment request submitted successfully",
      data: appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while creating appointment",
      error: error.message,
    });
  }
};

// GET /api/appointments -> list all appointments (for an admin dashboard)
exports.getAppointments = async (req, res) => {
  try {
    const { status, date } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (date) filter.date = date;

    const appointments = await Appointment.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching appointments",
      error: error.message,
    });
  }
};

// GET /api/appointments/:id -> single appointment
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    return res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching appointment",
      error: error.message,
    });
  }
};

// PUT /api/appointments/:id -> update status or details (e.g. admin confirms/cancels)
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while updating appointment",
      error: error.message,
    });
  }
};

// DELETE /api/appointments/:id -> cancel/remove an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while deleting appointment",
      error: error.message,
    });
  }
};
