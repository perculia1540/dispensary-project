const mongoose = require("mongoose");

// Connects to MongoDB using the URI stored in .env (MONGODB_URI).
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
