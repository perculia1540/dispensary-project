const mongoose = require("mongoose");

// This schema mirrors the fields in appointment.html exactly:
// fullname, registration, phone, email, gender, date, time, service, reason
const appointmentSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: 100,
    },
    registration: {
      type: String,
      required: [true, "Registration number is required"],
      trim: true,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    date: {
      type: String, // stored as YYYY-MM-DD, same format the <input type="date"> sends
      required: [true, "Appointment date is required"],
    },
    time: {
      type: String, // stored as HH:MM, same format the <input type="time"> sends
      required: [true, "Appointment time is required"],
    },
    service: {
      type: String,
      required: true,
      enum: [
        "General Consultation",
        "Health Checkup",
        "Medical Advice",
        "Laboratory Services",
      ],
    },
    reason: {
      type: String,
      required: [true, "Reason for visit is required"],
      trim: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // adds createdAt / updatedAt automatically
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
