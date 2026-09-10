// Optional: populate the database with a couple of sample records.
// Run with: npm run seed
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db");
const Appointment = require("../models/Appointment");
const ContactMessage = require("../models/ContactMessage");

async function seed() {
  await connectDB();

  await Appointment.deleteMany({});
  await ContactMessage.deleteMany({});

  await Appointment.create([
    {
      fullname: "Jane Mwakalinga",
      registration: "MUST/2024/0123",
      phone: "0712345678",
      email: "jane@example.com",
      gender: "Female",
      date: "2026-09-15",
      time: "10:30",
      service: "General Consultation",
      reason: "Routine checkup",
    },
  ]);

  await ContactMessage.create([
    {
      name: "John Doe",
      email: "john@example.com",
      message: "What are your opening hours on weekends?",
    },
  ]);

  console.log("Seed data inserted.");
  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
