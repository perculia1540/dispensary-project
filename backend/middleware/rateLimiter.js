const rateLimit = require("express-rate-limit");

// Limits how many appointment/contact submissions one IP can make,
// to protect the public form endpoints from spam/abuse.
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
});

module.exports = formLimiter;
