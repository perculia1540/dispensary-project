require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");
const formLimiter = require("./middleware/rateLimiter");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const appointmentRoutes = require("./routes/appointmentRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// --- Core middleware ---
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS: allow requests from your frontend (set CLIENT_ORIGIN in .env)
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);

// --- Health check ---
app.get("/", (req, res) => {
  res.json({ success: true, message: "MUST Dispensary API is running" });
});

// --- Routes ---
app.use("/api/appointments", formLimiter, appointmentRoutes);
app.use("/api/contact", formLimiter, contactRoutes);

// --- 404 + error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
